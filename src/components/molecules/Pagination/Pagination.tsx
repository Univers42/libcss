import { useMemo } from 'react';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  siblings?: number;
  className?: string;
}

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function Pagination({ page, totalPages, onChange, siblings = 1, className }: PaginationProps) {
  const pages = useMemo(() => {
    const totalPageNumbers = siblings * 2 + 5;
    if (totalPages <= totalPageNumbers) return range(1, totalPages);

    const leftSib = Math.max(page - siblings, 1);
    const rightSib = Math.min(page + siblings, totalPages);
    const showLeftDots = leftSib > 2;
    const showRightDots = rightSib < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const left = range(1, 3 + 2 * siblings);
      return [...left, -1, totalPages];
    }
    if (showLeftDots && !showRightDots) {
      const right = range(totalPages - (2 + 2 * siblings), totalPages);
      return [1, -1, ...right];
    }
    return [1, -1, ...range(leftSib, rightSib), -2, totalPages];
  }, [page, totalPages, siblings]);

  return (
    <nav className={`pagination${className ? ` ${className}` : ''}`} aria-label="Pagination">
      <button className="pagination__btn" disabled={page <= 1} onClick={() => onChange(page - 1)}>‹</button>
      {pages.map((p, i) =>
        p < 0 ? (
          <span key={`dots-${i}`} className="pagination__dots">…</span>
        ) : (
          <button key={p} className={`pagination__btn${p === page ? ' pagination__btn--active' : ''}`} onClick={() => onChange(p)}>
            {p}
          </button>
        ),
      )}
      <button className="pagination__btn" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>›</button>
    </nav>
  );
}
