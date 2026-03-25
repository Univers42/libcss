export interface TableProps {
  readonly headers: readonly string[];
  readonly rows: readonly (readonly string[])[];
  readonly striped?: boolean;
  readonly bordered?: boolean;
  readonly hoverable?: boolean;
  readonly compact?: boolean;
  readonly className?: string;
}
