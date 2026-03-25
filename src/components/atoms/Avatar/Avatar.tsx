import { useState } from 'react';
import type { AvatarProps } from './Avatar.types';

function initialsColor(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = text.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 55%, 55%)`;
}

export function Avatar({ src, alt = '', initials, size = 'md', shape = 'circle', status, className }: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;
  const cls = ['avatar', `avatar--${size}`, `avatar--${shape}`, className].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      {showImage ? (
        <img className="avatar__img" src={src} alt={alt} onError={() => setImgError(true)} />
      ) : (
        <span className="avatar__initials" style={{ background: initialsColor(initials || alt || '?') }}>
          {(initials || alt || '?').slice(0, 2).toUpperCase()}
        </span>
      )}
      {status && <span className={`avatar__status avatar__status--${status}`} />}
    </div>
  );
}
