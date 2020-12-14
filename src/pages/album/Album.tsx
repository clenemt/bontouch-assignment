import React, {
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  useLayoutEffect
} from 'react';
import { useQuery } from 'react-query';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Close } from '../../components/Close/Close';
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
import { useBreadcrumbs } from '../../contexts/Breadcrumbs';

type RouteProps = {
  user: string;
  album: string;
};

export const Album = () => {
  const overlay = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const [active, setActive] = useState<Photo | null>();
  const [breadcrumbs, setBreadcrumbs] = useBreadcrumbs();
  const match = useRouteMatch<RouteProps>();
  const photoMatch = useRouteMatch<RouteProps & { photo: string }>(
    '/users/:user/:album/:photo'
  );

  // Fetch current user or grab it from cache
  // also update the breadcrumb context to avoid seeing the id
  useQuery<User>(
    ['users', match.params.user],
    () => fetchUser(match.params.user),
    {
      initialData: () => {
        const user = queryCache
          .getQueryData<User[]>('users')
          ?.find((u) => u.id === +match.params.user);
        if (user) setBreadcrumbs({ ...breadcrumbs, user });
        return user;
      },
      initialStale: true,
      onSuccess: (user) => setBreadcrumbs({ ...breadcrumbs, user })
    }
  );

  // Fetch current album or grab it from cache
  // also update the breadcrumb context to avoid seeing the id
  const album = useQuery<IAlbum>(
    ['albums', match.params.album],
    () => fetchAlbum(match.params.album),
    {
      initialData: () => {
        const album = queryCache
          .getQueryData<IAlbum[]>(['albums', { user: match.params.user }])
          ?.find((u) => u.id === +match.params.album);
        if (album)
          setBreadcrumbs({
            ...breadcrumbs,
            album: { id: album.id, name: album.title }
          });
        return album;
      },
      initialStale: true,
      onSuccess: (album) =>
        setBreadcrumbs({
          ...breadcrumbs,
          album: { id: album.id, name: album.title }
        })
    }
  );

  // Fetch current album photos
  const photosQuery = useQuery<Photo[]>(
    ['photos', { album: match.params.album }],
    () => fetchAlbumPhotos(match.params.album),
    { enabled: album.data }
  );

  // Revert to original url
  const onClose = () => history.push(match.url);

  // Handle Esc and arrows
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') return onClose();
    if (!photosQuery.data?.length) return;

    const idx = photosQuery.data.findIndex((photo) => photo === active);
    if (e.key === 'ArrowLeft') {
      const id =
        idx - 1 < 0
          ? photosQuery.data[photosQuery.data.length - 1].id
          : photosQuery.data[idx - 1].id;
      return history.push(`${match.url}/${id}`);
    }
    if (e.key === 'ArrowRight') {
      const id =
        idx + 1 === photosQuery.data.length
          ? photosQuery.data[0].id
          : photosQuery.data[idx + 1].id;
      return history.push(`${match.url}/${id}`);
    }
  };

  // Make sure we focus the overlay to prevent tabbing behind
  useLayoutEffect(() => {
    if (active) overlay.current!.focus();
  }, [active]);

  // Effect that watches every url changes and
  // update the current active state
  useEffect(() => {
    if (photosQuery.data) {
      setActive(
        photoMatch?.params.photo
          ? photosQuery.data.find(
              (photo) => photo.id === +photoMatch.params.photo
            )
          : null
      );
    }
  }, [photoMatch?.params.photo, photosQuery.data]);

  if (album.status === 'loading') return <Delayed>Loading album...</Delayed>;
  if (album.status === 'error') return <p>Album error: {album.error}</p>;
  if (!album.data) return <p>No album found with id ${match.params.album}</p>;

  return (
    <>
      <h1 className="text-center pt-md-5 mb-4" id="content">
        {album.data.title}
      </h1>
      {photosQuery.status === 'loading' ? (
        <Delayed>Loading album photos...</Delayed>
      ) : photosQuery.status === 'error' ? (
        <p>Could not load album photos: {photosQuery.error}</p>
      ) : !photosQuery.data || !photosQuery.data.length ? (
        <p>No photos found</p>
      ) : (
        <>
          <p className="text-center small fst-italic text-gray mb-5">
            Showing {photosQuery.data.length} photos
          </p>

          <div className="row g-2 g-md-3 g-xl-4 pt-md-5">
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
            <div
              ref={overlay}
              className="img__container img__container--open"
              tabIndex={-1}
              onKeyDown={onKeyDown}
            >
              <div className="img__bg" />
              <div className="img__inner">
                <Close
                  className="img__close"
                  variant="light"
                  onClick={onClose}
                />
                <figure>
                  <img
                    className="img--fullscreen img-fluid"
                    src={active.url}
                    alt={`An album photo named ${active.title}`}
                    width="600"
                    height="600"
                  />
                  <figcaption className="text-center text-light">
                    {active.title}
                  </figcaption>
                </figure>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
