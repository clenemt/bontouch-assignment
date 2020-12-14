import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useRouteMatch } from 'react-router-dom';
import { Delayed } from '../../components/Delayed/Delayed';
import {
  fetchAlbum,
  fetchAlbumPhotos,
  fetchUser,
  queryCache
} from '../../services/queries';
import { Album as IAlbum } from '../../types/Album';
import { Photo } from '../../types/Photo';
import { User } from '../../types/User';
import { useBreadcrumbs } from '../contexts/breadcrumbs';

type RouteProps = {
  userId: string;
  albumId: string;
};

export const Album = () => {
  const [active, setActive] = useState<Photo | null>();
  const [breadcrumbs, setBreadcrumbs] = useBreadcrumbs();
  const match = useRouteMatch<RouteProps>();
  const photoMatch = useRouteMatch<RouteProps & { photoId: string }>(
    '/users/:userId/:albumId/:photoId'
  );

  useQuery<User>(
    ['users', match.params.userId],
    () => fetchUser(match.params.userId),
    {
      initialData: () =>
        queryCache
          .getQueryData<User[]>('users')
          ?.find((u) => u.id === +match.params.userId),
      initialStale: true,
      onSuccess: (user) => setBreadcrumbs({ ...breadcrumbs, userId: user.name })
    }
  );

  const albumQuery = useQuery<IAlbum>(
    ['albums', match.params.albumId],
    () => fetchAlbum(match.params.albumId),
    {
      initialData: () =>
        queryCache
          .getQueryData<IAlbum[]>(['albums', { user: match.params.userId }])
          ?.find((u) => u.id === +match.params.albumId),
      initialStale: true,
      onSuccess: (album) =>
        setBreadcrumbs({ ...breadcrumbs, albumId: album.title })
    }
  );

  const photosQuery = useQuery<Photo[]>(
    ['photos', { album: match.params.albumId }],
    () => fetchAlbumPhotos(match.params.albumId),
    {
      enabled: albumQuery.data,
      onSuccess: (data) => {
        if (!photoMatch?.params.photoId || !data || !data.length) return;
        setActive(
          data.find((photo) => photo.id === +photoMatch.params.photoId)
        );
      }
    }
  );

  useEffect(() => {
    if (photosQuery.data) {
      setActive(
        photoMatch?.params.photoId
          ? photosQuery.data.find(
              (photo) => photo.id === +photoMatch.params.photoId
            )
          : null
      );
    }
  }, [photoMatch?.params.photoId, photosQuery.data]);

  return albumQuery.status === 'loading' ? (
    <Delayed>Loading album...</Delayed>
  ) : albumQuery.status === 'error' ? (
    <p>
      Could not load album ${match.params.albumId}: ${albumQuery.error}
    </p>
  ) : !albumQuery.data ? (
    <p>No album found with id ${match.params.albumId}</p>
  ) : (
    <>
      <h1 className="text-center">{albumQuery.data.title}</h1>
      {photosQuery.status === 'loading' ? (
        <Delayed>Loading album photos...</Delayed>
      ) : photosQuery.status === 'error' ? (
        <p>Could not load album photos: {photosQuery.error}</p>
      ) : !photosQuery.data || !photosQuery.data.length ? (
        <p>No photos found</p>
      ) : (
        <>
          <p className="text-center">{photosQuery.data.length} photos</p>
          <div className="row g-2 g-md-3 g-xl-4">
            {photosQuery.data.map((photo, i) => (
              <Link
                key={photo.id}
                to={`${match.url}/${photo.id}`}
                className="col-6 col-md-4 col-lg-3"
              >
                <div className="thumbnail__container">
                  <img
                    className="thumbnail__img"
                    src={photo.thumbnailUrl}
                    alt={`An album photo named ${photo.title}`}
                    loading={i > 25 ? 'lazy' : 'eager'}
                  />
                </div>
              </Link>
            ))}
          </div>
          {active && (
            <div className="img__container img__container--open">
              <div className="img__bg" />
              <Link to={match.url} className="img__inner">
                <figure>
                  <img
                    className="img--fullscreen"
                    src={active.url}
                    alt={`An album photo named ${active.title}`}
                  />
                  <figcaption className="text-center text-light">
                    {active.title}
                  </figcaption>
                </figure>
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
};
