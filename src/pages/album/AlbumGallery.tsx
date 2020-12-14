import classNames from 'classnames';
import React, {
  useLayoutEffect,
  useRef,
  KeyboardEvent,
  useState,
  CSSProperties
} from 'react';
import { Close } from '../../components/Close/Close';
import { Photo } from '../../types/Photo';
import { useWindowSize } from '../../utils/hooks';

type Props = {
  target: any;
  photo: Photo;
  onClose: () => void;
  onKeyDown: (e: KeyboardEvent) => void;
};

export const AlbumGallery = ({ onClose, onKeyDown, photo, target }: Props) => {
  const [vw, vh] = useWindowSize();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});
  const [animating, setAnimating] = useState('open');

  // Animation effect
  useLayoutEffect(() => {
    const rect = target.getBoundingClientRect();
    const scale = Math.min(vw, 600) / rect.width;
    const newStyle = {
      position: 'absolute',
      top: rect.top,
      left: rect.left,
      width: rect.width
    } as CSSProperties;

    if (animating === 'open') {
      setAnimating('opening');
      newStyle.transition = 'transform ease-in-out .2s';
    } else if (animating === 'opening') {
      newStyle.transition = 'transform ease-in-out .2s';
      setTimeout(() => setAnimating('opened'), 200);
    }

    if (animating !== 'open') {
      newStyle.transform = `translateX(${
        vw / 2 - rect.width / 2 - rect.left
      }px) translateY(${vh / 2 - rect.width / 2 - rect.top}px) scale(${scale})`;
    }

    setStyle(newStyle);
  }, [animating, target, vw, vh]);

  // Make sure we focus the overlay to prevent external tabbing
  useLayoutEffect(() => {
    overlayRef.current!.focus();
  }, []);

  return (
    <div
      ref={overlayRef}
      className={classNames(
        'gallery__container',
        animating !== 'open' && 'gallery__container--open'
      )}
      tabIndex={-1}
      onKeyDown={onKeyDown}
    >
      <div className="gallery__bg" />
      <div className="gallery__inner">
        <Close className="gallery__close" variant="light" onClick={onClose} />
        <figure>
          <img
            style={style}
            className="gallery__img img-fluid"
            src={photo.thumbnailUrl}
            alt={`An album photo named ${photo.title}`}
          />
          <figcaption className="gallery__caption text-center text-light">
            {photo.title}
          </figcaption>
        </figure>
      </div>
    </div>
  );
};
