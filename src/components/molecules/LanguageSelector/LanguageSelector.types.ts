export interface Language<T extends string = string> {
  readonly code: T;
  readonly flag: string;
  readonly label: string;
}

export interface LanguageSelectorProps<T extends string = string> {
  readonly language: T;
  readonly onLanguageChange: (language: T) => void;
  readonly languages: readonly Language<T>[];
  readonly id?: string;
  readonly className?: string;
}
