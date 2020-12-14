import { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserDetails = ({ user }: Props) => (
  <dl className="d-flex justify-content-center fst-italic">
    <dt className="visually-hidden">User company</dt>
    <dd className="me-4">{user.company.name}</dd>
    <dt className="visually-hidden">User email</dt>
    <dd className="me-4">{user.email}</dd>
    <dt className="visually-hidden">Company address</dt>
    <dd>
      {user.address.street}, {user.address.zipcode} {user.address.city}
    </dd>
  </dl>
);
