import { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserDetails = ({ user }: Props) => (
  <dl className="d-flex flex-wrap justify-content-center text-center small fst-italic text-gray mb-5">
    <dt className="visually-hidden">User company</dt>
    <dd className="me-3">{user.company.name}</dd>
    <dd className="me-3">—</dd>
    <dt className="visually-hidden">User email</dt>
    <dd className="me-3">{user.email}</dd>
    <dd className="me-3">—</dd>
    <dt className="visually-hidden">Company address</dt>
    <dd>
      {user.address.street}, {user.address.zipcode} {user.address.city}
    </dd>
  </dl>
);
