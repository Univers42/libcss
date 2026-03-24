export type ImageSize = 'sm' | 'md' | 'full';

export interface ImageProps {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
  readonly size?: ImageSize;
  readonly rounded?: boolean;
  readonly borderless?: boolean;
  readonly centered?: boolean;
  readonly className?: string;
}
