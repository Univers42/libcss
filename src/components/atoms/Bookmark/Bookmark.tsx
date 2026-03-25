import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import type { BookmarkProps } from './Bookmark.types';

export function Bookmark({
  url,
  title,
  description,
  thumbnail,
  favicon,
  className = '',
}: BookmarkProps): JSX.Element {
  const classes = cn('prisma-bookmark', !thumbnail && 'prisma-bookmark--no-thumbnail', className);

  return (
    <a className={classes} href={url} target="_blank" rel="noopener noreferrer">
      <div className="prisma-bookmark__content">
        <span className="prisma-bookmark__title">{title}</span>
        {description && <span className="prisma-bookmark__description">{description}</span>}
        <span className="prisma-bookmark__url">
          {favicon && <img className="prisma-bookmark__favicon" src={favicon} alt="" />}
          {new URL(url).hostname}
        </span>
      </div>
      {thumbnail && (
        <div className="prisma-bookmark__thumbnail">
          <img src={thumbnail} alt="" />
        </div>
      )}
    </a>
  );
}
