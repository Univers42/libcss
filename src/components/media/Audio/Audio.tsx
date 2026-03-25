import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import type { AudioProps } from './Audio.types';

export function Audio({
  src,
  title = 'Audio',
  artist,
  compact = false,
  className = '',
}: AudioProps): JSX.Element {
  const classes = cn('prisma-audio', compact && 'prisma-audio--compact', className);

  return (
    <div className={classes}>
      <div className="prisma-audio__info">
        <span className="prisma-audio__title">{title}</span>
        {artist && <span className="prisma-audio__artist">{artist}</span>}
      </div>
      <audio className="prisma-audio__player" src={src} controls />
    </div>
  );
}
