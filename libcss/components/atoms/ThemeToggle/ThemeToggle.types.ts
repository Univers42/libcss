export interface ThemeToggleProps {
  readonly isDark: boolean;
  readonly onToggle: () => void;
  readonly className?: string;
}
