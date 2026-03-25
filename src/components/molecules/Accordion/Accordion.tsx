import { useState, useCallback } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: readonly AccordionItem[];
  multiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({ items, multiple = false, defaultOpen = [], className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpen));

  const toggle = useCallback((id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  }, [multiple]);

  return (
    <div className={`accordion${className ? ` ${className}` : ''}`}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id} className={`accordion__item${isOpen ? ' accordion__item--open' : ''}`}>
            <button
              type="button"
              className="accordion__trigger"
              onClick={() => !item.disabled && toggle(item.id)}
              disabled={item.disabled}
              aria-expanded={isOpen}
            >
              <span className="accordion__title">{item.title}</span>
              <span className="accordion__chevron">{isOpen ? '▾' : '▸'}</span>
            </button>
            {isOpen && <div className="accordion__panel">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
