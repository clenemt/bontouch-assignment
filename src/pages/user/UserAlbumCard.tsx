import React from 'react';
import { Link } from 'react-router-dom';
import { Album } from '../../types/Album';

type Props = {
  album: Album;
  id: string;
};

export const UserAlbumCard = ({ album, id }: Props) => (
  <div className="col-sm-6 col-lg-4 col-xl-3">
    <Link
      to={`/users/${id}/${album.id}`}
      className="card card--info card--light rounded mb-0 h-100"
      aria-describedby={`album${album.id}`}
    >
      <dl>
        <div className="card-body">
          <dt className="visually-hidden">Album title</dt>
          <dd className="card-title" id={`album${album.id}`}>
            {album.title}
          </dd>
        </div>
      </dl>
    </Link>
  </div>
);
