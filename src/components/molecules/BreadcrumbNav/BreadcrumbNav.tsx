export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbNavProps {
  items: readonly BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  className?: string;
}

export function BreadcrumbNav({ items, separator = '/', maxItems, className }: BreadcrumbNavProps) {
  let visibleItems = [...items];

  if (maxItems && items.length > maxItems) {
    visibleItems = [items[0]!, { label: '…' }, ...items.slice(-(maxItems - 1))];
  }

  return (
    <nav className={`breadcrumb-nav${className ? ` ${className}` : ''}`} aria-label="Breadcrumb">
      <ol className="breadcrumb-nav__list">
        {visibleItems.map((item, i) => (
          <li key={i} className="breadcrumb-nav__item">
            {i > 0 && <span className="breadcrumb-nav__sep">{separator}</span>}
            {item.icon && <span className="breadcrumb-nav__icon">{item.icon}</span>}
            {item.href ? (
              <a className="breadcrumb-nav__link" href={item.href}>
                {item.label}
              </a>
            ) : (
              <span
                className="breadcrumb-nav__current"
                aria-current={i === visibleItems.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
