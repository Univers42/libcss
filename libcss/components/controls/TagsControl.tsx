import { useState, useRef, useCallback, useMemo } from 'react';
import type { TagsParameter } from './types';

interface TagsControlProps {
  param: TagsParameter;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
}

export function TagsControl({ param, value, onChange }: TagsControlProps) {
  const tags: string[] = useMemo(
    () =>
      Array.isArray(value) ? value : Array.isArray(param.defaultValue) ? param.defaultValue : [],
    [value, param.defaultValue],
  );

  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const allowCustom = param.allowCustom !== false;

  const addTag = useCallback(
    (tag: string) => {
      const trimmed = tag.trim().toLowerCase();
      if (!trimmed) return;
      if (tags.includes(trimmed)) return;
      if (param.maxTags && tags.length >= param.maxTags) return;
      if (!allowCustom && param.suggestions && !param.suggestions.includes(trimmed)) return;
      onChange(param.key, [...tags, trimmed]);
      setInput('');
      setShowSuggestions(false);
    },
    [tags, param, onChange, allowCustom],
  );

  const removeTag = useCallback(
    (tag: string) => {
      onChange(
        param.key,
        tags.filter((t) => t !== tag),
      );
    },
    [tags, param.key, onChange],
  );

  const filteredSuggestions = param.suggestions?.filter(
    (s) => !tags.includes(s) && s.toLowerCase().includes(input.toLowerCase()),
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && input === '' && tags.length > 0) {
      removeTag(tags[tags.length - 1]!);
    }
  };

  return (
    <div className="shell-control">
      <label className="shell-control__label">
        {param.label}
        {param.maxTags && (
          <span className="shell-control__value">
            {tags.length}/{param.maxTags}
          </span>
        )}
      </label>
      <div className="shell-control__tags-box">
        {tags.map((tag) => (
          <span key={tag} className="shell-control__tag-pill">
            {tag}
            <button
              type="button"
              className="shell-control__tag-remove"
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          className="shell-control__tags-input"
          value={input}
          placeholder={tags.length === 0 ? 'Add tag…' : ''}
          disabled={param.disabled || (!!param.maxTags && tags.length >= param.maxTags)}
          onChange={(e) => {
            setInput(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {showSuggestions && filteredSuggestions && filteredSuggestions.length > 0 && (
        <div className="shell-control__tags-suggestions">
          {filteredSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              className="shell-control__tags-suggestion"
              onMouseDown={() => addTag(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
