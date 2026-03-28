interface BreadcrumbSegment {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  segments: BreadcrumbSegment[];
}

export function ExplorerBreadcrumb({ segments }: BreadcrumbProps) {
  return (
    <nav className="shell-breadcrumb" aria-label="Navigation">
      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;
        return (
          <span key={i} className="shell-breadcrumb__item">
            {seg.onClick && !isLast ? (
              <button type="button" className="shell-breadcrumb__link" onClick={seg.onClick}>
                {seg.label}
              </button>
            ) : (
              <span className="shell-breadcrumb__current">{seg.label}</span>
            )}
            {!isLast && <span className="shell-breadcrumb__sep">›</span>}
          </span>
        );
      })}
    </nav>
  );
}
