import React from 'react';
import { Link } from 'react-router-dom';
import { animated, useTransition } from 'react-spring';
import { Album } from '../../types/Album';

type Props = {
  albums: Album[];
  userId: string;
};

export const UserAlbumsCards = ({ albums, userId }: Props) => {
  const transitions = useTransition(albums, (album) => album.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
    trail: 50
  });

  return (
    <>
      {transitions.map(({ item: album, props: style, key }) => (
        <animated.div
          key={key}
          className="col-sm-6 col-lg-4 col-xl-3"
          style={style}
        >
          <Link
            to={`/users/${userId}/${album.id}`}
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
        </animated.div>
      ))}
    </>
  );
};
