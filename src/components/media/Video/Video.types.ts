export type VideoAspect = '16:9' | '4:3' | '1:1' | '21:9';

export interface VideoProps {
  readonly src: string;
  readonly poster?: string;
  readonly caption?: string;
  readonly aspect?: VideoAspect;
  readonly borderless?: boolean;
  readonly className?: string;
}
