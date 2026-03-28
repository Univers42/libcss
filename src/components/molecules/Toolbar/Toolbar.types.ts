export interface ToolbarItem {
  id: string;
  icon?: React.ReactNode;
  label: string;
  disabled?: boolean;
  active?: boolean;
}

export interface ToolbarProps {
  items: readonly ToolbarItem[];
  onAction: (id: string) => void;
  size?: 'sm' | 'md';
  vertical?: boolean;
  className?: string;
}
