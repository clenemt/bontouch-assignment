import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import { Delayed } from '../../components/Delayed/Delayed';
import { fetchUsers } from '../../services/queries';
import { User } from '../../types/User';
import { useLocalStorage } from '../../utils/hooks';
import { UsersCard } from './UserCard';

export const Users = () => {
  const { status, data: users, error } = useQuery<User[]>('users', fetchUsers);
  const [starred, setStarred] = useLocalStorage('starred', []);

  // Add or remove the star
  const onStarClick = useCallback(
    (id: number, e: React.SyntheticEvent) => {
      // Prevent from redirecting to user since link is on parent card
      e.preventDefault();
      const i = starred.indexOf(id);
      if (i === -1) return setStarred([...starred, id]);
      setStarred([...starred.slice(0, i), ...starred.slice(i + 1)]);
    },
    [starred, setStarred]
  );

  return status === 'loading' ? (
    <Delayed>Loading users...</Delayed>
  ) : status === 'error' ? (
    <p>Could not load users: {error}</p>
  ) : !users || !users.length ? (
    <p>No users found</p>
  ) : (
    <>
      <h2>Favorites</h2>
      <div className="row g-2 g-sm-3 gx-md-4 gy-lg-4">
        {users
          .filter((user) => starred.indexOf(user.id) !== -1)
          .map((user) => (
            <UsersCard
              key={user.id}
              user={user}
              active={true}
              onStarClick={onStarClick}
            />
          ))}
      </div>

      <h2>Users</h2>
      <div className="row g-2 g-sm-3 gx-md-4 gy-lg-4">
        {users
          .filter((user) => starred.indexOf(user.id) === -1)
          .map((user) => (
            <UsersCard
              key={user.id}
              user={user}
              active={false}
              onStarClick={onStarClick}
            />
          ))}
      </div>
    </>
  );
};
