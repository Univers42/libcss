export interface BookmarkProps {
  readonly url: string;
  readonly title: string;
  readonly description?: string;
  readonly thumbnail?: string;
  readonly favicon?: string;
  readonly className?: string;
}
