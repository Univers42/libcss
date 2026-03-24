import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import { DEFAULT_FILE_ICON } from './FileAttachment.constants';
import type { FileAttachmentProps } from './FileAttachment.types';

export function FileAttachment({
  name,
  size,
  href,
  icon = DEFAULT_FILE_ICON,
  compact = false,
  className = '',
}: FileAttachmentProps): JSX.Element {
  const classes = cn(
    'prisma-file',
    compact && 'prisma-file--compact',
    className,
  );

  return (
    <a className={classes} href={href} download>
      <span className="prisma-file__icon">{icon}</span>
      <div className="prisma-file__info">
        <span className="prisma-file__name">{name}</span>
        <span className="prisma-file__size">{size}</span>
      </div>
      <span className="prisma-file__action">⬇</span>
    </a>
  );
}
