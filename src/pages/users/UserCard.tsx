import React from 'react';
import { Link } from 'react-router-dom';
import Star from '../../components/Star/Star';
import { User } from '../../types/User';

type Props = {
  user: User;
  active: boolean;
  onStarClick: (id: number, e: React.SyntheticEvent) => void;
};

export const UsersCard = ({ user, active, onStarClick }: Props) => (
  <div className="col-sm-6 col-lg-4 col-xl-3">
    <Link to={`/users/${user.id}`}>
      <dl className="card rounded mb-0">
        <div className="card-body">
          <div className="d-flex align-items-baseline">
            <dt className="visually-hidden">User name</dt>
            <dd className="card-title fw-bold">{user.name}</dd>
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
        </div>
      </dl>
    </Link>
  </div>
);
