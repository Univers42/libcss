export interface FileAttachmentProps {
  readonly name: string;
  readonly size: string;
  readonly href: string;
  readonly icon?: string;
  readonly compact?: boolean;
  readonly className?: string;
}
