export interface CodeBlockProps {
  readonly code: string;
  readonly language?: string;
  readonly showLineNumbers?: boolean;
  readonly highlightLines?: readonly number[];
  readonly mermaid?: boolean;
  readonly compact?: boolean;
  readonly className?: string;
}
