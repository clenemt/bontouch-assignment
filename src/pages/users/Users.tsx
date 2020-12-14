import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import { Delayed } from '../../components/Delayed/Delayed';
import { fetchUsers } from '../../services/queries';
import { User } from '../../types/User';
import { useLocalStorage } from '../../utils/hooks';
import { UsersCard } from './UsersCard';

export const Users = () => {
  const { status, data: users, error } = useQuery<User[]>('users', fetchUsers);
  const [starred, setStarred] = useLocalStorage('starred', []);

  // Add or remove the star
  const onStarClick = useCallback(
    (id: number, e: React.SyntheticEvent) => {
      // Prevent from redirecting to user
      // since link is on parent card
      e.preventDefault();

      const i = starred.indexOf(id);
      if (i === -1) return setStarred([...starred, id]);
      setStarred([...starred.slice(0, i), ...starred.slice(i + 1)]);
    },
    [starred, setStarred]
  );

  if (status === 'loading') return <Delayed>Loading users...</Delayed>;
  if (status === 'error') return <p>Users error: {error}</p>;
  if (!users || !users.length) return <p>No users found</p>;

  const normalUsers = users.filter((user) => starred.indexOf(user.id) === -1);
  const favoriteUsers = users.filter((user) => starred.indexOf(user.id) !== -1);

  return (
    <>
      <h2 className="border-bottom" id="content">
        Favorites
      </h2>
      <div className="row g-2 g-sm-3 gx-md-4 gy-lg-4 mb-5">
        {favoriteUsers.length > 0 ? (
          favoriteUsers.map((user) => (
            <UsersCard
              key={user.id}
              user={user}
              active={true}
              onStarClick={onStarClick}
            />
          ))
        ) : (
          <div className="d-flex align-items-center justify-content-center text-muted py-4">
            Your ⭐ users will appear here...
          </div>
        )}
      </div>

      <h2 className="border-bottom">Users</h2>
      <div className="row g-2 g-sm-3 gx-md-4 gy-lg-4 mb-4">
        {normalUsers.length > 0 ? (
          normalUsers.map((user) => (
            <UsersCard
              key={user.id}
              user={user}
              active={false}
              onStarClick={onStarClick}
            />
          ))
        ) : (
          <div className="d-flex align-items-center justify-content-center text-muted py-4">
            Wow, you seem to enjoy those stars a bit too much 😮
          </div>
        )}
      </div>
    </>
  );
};
