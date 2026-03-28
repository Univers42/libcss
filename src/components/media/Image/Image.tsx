import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import type { ImageProps } from './Image.types';

export function Image({
  src,
  alt,
  caption,
  size = 'full',
  rounded = false,
  borderless = false,
  centered = false,
  className = '',
}: ImageProps): JSX.Element {
  const classes = cn(
    'prisma-image',
    size !== 'full' && `prisma-image--${size}`,
    rounded && 'prisma-image--rounded',
    borderless && 'prisma-image--borderless',
    centered && 'prisma-image--centered',
    className,
  );

  return (
    <figure className={classes}>
      <img className="prisma-image__img" src={src} alt={alt} />
      {caption && <figcaption className="prisma-image__caption">{caption}</figcaption>}
    </figure>
  );
}
