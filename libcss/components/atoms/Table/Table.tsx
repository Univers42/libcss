import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import type { TableProps } from './Table.types';

export function Table({
  headers,
  rows,
  striped = false,
  bordered = false,
  hoverable = false,
  compact = false,
  className = '',
}: TableProps): JSX.Element {
  const classes = cn(
    'prisma-table',
    striped && 'prisma-table--striped',
    bordered && 'prisma-table--bordered',
    hoverable && 'prisma-table--hoverable',
    compact && 'prisma-table--compact',
    className,
  );

  return (
    <div className="prisma-table__wrapper">
      <table className={classes}>
        <thead className="prisma-table__header">
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="prisma-table__row">
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
