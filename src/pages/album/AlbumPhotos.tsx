import React from 'react';
import { Link } from 'react-router-dom';
import { animated, useTransition } from 'react-spring';
import { Photo } from '../../types/Photo';

type Props = {
  photos: Photo[];
  url: string;
};

export const AlbumPhotos = ({ photos, url }: Props) => {
  const transitions = useTransition(photos, (photo) => photo.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
    trail: 25
  });
  return (
    <>
      {transitions.map(({ item: photo, props: style, key }, i) => (
        <animated.div
          className="col-6 col-md-4 col-lg-3"
          style={style}
          key={key}
        >
          <Link key={photo.id} to={`${url}/${photo.id}`}>
            <div className="thumbnail__container">
              <img
                className="thumbnail__img"
                src={photo.thumbnailUrl}
                alt={`An album photo named ${photo.title}`}
                loading={i > 25 ? 'lazy' : 'eager'}
              />
            </div>
          </Link>
        </animated.div>
      ))}
    </>
  );
};
