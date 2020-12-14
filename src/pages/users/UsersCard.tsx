import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from '../../components/Star/Star';
import { User } from '../../types/User';

type Props = {
  user: User;
  active: boolean;
  onStarClick: (id: number, e: React.SyntheticEvent) => void;
};

export const UsersCard = ({ user, active, onStarClick }: Props) => (
  <div className="col-sm-6 col-lg-4">
    <Link
      to={`/users/${user.id}`}
      className="card card--info rounded mb-0"
      aria-describedby={`user${user.id}`}
    >
      <dl className="card-body">
        <div className="d-flex align-items-baseline">
          <dt className="visually-hidden">User name</dt>
          <dd className="card-title fw-bold" id={`user${user.id}`}>
            {user.name}
          </dd>
          <Star
            className="ms-auto"
            active={active}
            onClick={(e) => onStarClick(user.id, e)}
          />
        </div>
        <dt className="visually-hidden">User company</dt>
        <dd className="mb-0">{user.company.name}</dd>
        <dt className="visually-hidden">User email</dt>
        <dd className="mb-0">{user.email}</dd>
      </dl>
    </Link>
  </div>
);
