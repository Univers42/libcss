interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search components...',
}: SearchBarProps) {
  return (
    <div className="shell-search">
      <span className="shell-search__icon">🔍</span>
      <input
        type="text"
        className="shell-search__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button
          type="button"
          className="shell-search__clear"
          onClick={() => onChange('')}
        >
          ✕
        </button>
      )}
    </div>
  );
}
