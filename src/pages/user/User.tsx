import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Delayed } from '../../components/Delayed/Delayed';
import { fetchUser, fetchUserAlbums, queryCache } from '../../services/queries';
import { Album } from '../../types/Album';
import { User as IUser } from '../../types/User';
import { useBreadcrumbs } from '../contexts/breadcrumbs';
import { AlbumCard } from './AlbumCard';
import { UserDetails } from './UserDetails';

export const User = () => {
  const params = useParams<{ userId: string }>();
  const [breadcrumbs, setBreadcrumbs] = useBreadcrumbs();

  const userQuery = useQuery<IUser>(
    ['users', params.userId],
    () => fetchUser(params.userId),
    {
      initialData: () =>
        queryCache
          .getQueryData<IUser[]>('users')
          ?.find((u) => u.id === +params.userId),
      initialStale: true,
      onSuccess: (user) => setBreadcrumbs({ ...breadcrumbs, userId: user.name })
    }
  );

  const albumsQuery = useQuery<Album[]>(
    ['albums', { user: params.userId }],
    () => fetchUserAlbums(params.userId),
    { enabled: userQuery.data }
  );

  return userQuery.status === 'loading' ? (
    <Delayed>Loading users...</Delayed>
  ) : userQuery.status === 'error' ? (
    <p>
      Could not load user ${params.userId}: ${userQuery.error}
    </p>
  ) : !userQuery.data ? (
    <p>No user found with id ${params.userId}</p>
  ) : (
    <>
      <h1 className="text-center">{userQuery.data.name}</h1>
      <UserDetails user={userQuery.data} />

      <h2>Albums</h2>
      <div className="row g-2 g-sm-3 gx-md-4 gy-lg-4">
        {albumsQuery.status === 'loading' ? (
          <Delayed>Loading user albums...</Delayed>
        ) : albumsQuery.status === 'error' ? (
          <p>Could not load user albums: {albumsQuery.error}</p>
        ) : !albumsQuery.data || !albumsQuery.data.length ? (
          <p>No albums found</p>
        ) : (
          albumsQuery.data.map((album) => (
            <AlbumCard key={album.id} album={album} userId={params.userId} />
          ))
        )}
      </div>
    </>
  );
};
