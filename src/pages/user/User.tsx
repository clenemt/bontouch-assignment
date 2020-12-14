import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Delayed } from '../../components/Delayed/Delayed';
import { fetchUser, fetchUserAlbums, queryCache } from '../../services/queries';
import { Album } from '../../types/Album';
import { User as IUser } from '../../types/User';
import { useBreadcrumbs } from '../../contexts/Breadcrumbs';
import { UserAlbumsCards } from './UserAlbumsCards';
import { UserDetails } from './UserDetails';

export const User = () => {
  const params = useParams<{ user: string }>();
  const [breadcrumbs, setBreadcrumbs] = useBreadcrumbs();

  // Fetch current user or grab it from cache
  // also update the breadcrumb context to avoid seeing the id
  const user = useQuery<IUser>(
    ['users', params.user],
    () => fetchUser(params.user),
    {
      initialData: () => {
        const user = queryCache
          .getQueryData<IUser[]>('users')
          ?.find((u) => u.id === +params.user);
        if (user) setBreadcrumbs({ ...breadcrumbs, user });
        return user;
      },
      initialStale: true,
      onSuccess: (user) => setBreadcrumbs({ ...breadcrumbs, user })
    }
  );

  // Fetch current user albums
  const album = useQuery<Album[]>(
    ['albums', { user: params.user }],
    () => fetchUserAlbums(params.user),
    { enabled: user.data }
  );

  if (user.status === 'loading') return <Delayed>Loading user...</Delayed>;
  if (user.status === 'error') return <p>User error: ${user.error}</p>;
  if (!user.data) return <p>No user found with id ${params.user}</p>;

  return (
    <>
      <h1 className="text-center mb-4 pt-md-5" id="content">
        {user.data.name}
      </h1>
      <UserDetails user={user.data} />

      <h2 className="pt-md-5">Albums</h2>
      <div className="row g-2 g-sm-3 gx-md-4 gy-lg-4 mb-4">
        {album.status === 'loading' ? (
          <Delayed>Loading user albums...</Delayed>
        ) : album.status === 'error' ? (
          <p>Could not load user albums: {album.error}</p>
        ) : !album.data || !album.data.length ? (
          <p>No albums found</p>
        ) : (
          <UserAlbumsCards albums={album.data} userId={params.user} />
        )}
      </div>
    </>
  );
};
