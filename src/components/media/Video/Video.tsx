import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import type { VideoProps } from './Video.types';

const ASPECT_CLASS: Record<string, string> = {
  '4:3': 'prisma-video--square',
  '1:1': 'prisma-video--square',
  '21:9': 'prisma-video--wide',
};

export function Video({
  src,
  poster,
  caption,
  aspect = '16:9',
  borderless = false,
  className = '',
}: VideoProps): JSX.Element {
  const classes = cn(
    'prisma-video',
    ASPECT_CLASS[aspect],
    borderless && 'prisma-video--borderless',
    className,
  );

  return (
    <figure className={classes}>
      <div className="prisma-video__player">
        <video
          className="prisma-video__element"
          src={src}
          poster={poster}
          controls
        />
      </div>
      {caption && <figcaption className="prisma-video__caption">{caption}</figcaption>}
    </figure>
  );
}
