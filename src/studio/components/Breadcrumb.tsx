interface BreadcrumbSegment {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  segments: BreadcrumbSegment[];
}

export function Breadcrumb({ segments }: BreadcrumbProps) {
  return (
    <nav className="studio-breadcrumb" aria-label="Navigation">
      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;
        return (
          <span key={i} className="studio-breadcrumb__item">
            {seg.onClick && !isLast ? (
              <button
                type="button"
                className="studio-breadcrumb__link"
                onClick={seg.onClick}
              >
                {seg.label}
              </button>
            ) : (
              <span className="studio-breadcrumb__current">{seg.label}</span>
            )}
            {!isLast && <span className="studio-breadcrumb__sep">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
