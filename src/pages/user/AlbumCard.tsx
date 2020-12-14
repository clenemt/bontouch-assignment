import React from 'react';
import { Link } from 'react-router-dom';
import { Album } from '../../types/Album';

type Props = {
  album: Album;
  userId: string;
};

export const AlbumCard = ({ album, userId }: Props) => (
  <Link
    to={`/users/${userId}/${album.id}`}
    className="col-sm-6 col-lg-4 col-xl-3"
  >
    <dl className="card rounded mb-0 h-100">
      <div className="card-body">
        <dt className="visually-hidden">Album title</dt>
        <dd className="card-title fw-bold">{album.title}</dd>
      </div>
    </dl>
  </Link>
);
