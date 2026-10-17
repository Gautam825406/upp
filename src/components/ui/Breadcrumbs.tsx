/**
 * Visible breadcrumb navigation. Mirrored by BreadcrumbList JSON-LD in schema.ts,
 * so Google can render it as a structured snippet.
 */

import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';

export interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="container-shell pt-24 sm:pt-28">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={`${item.name}-${index}`}>
              <li>
                {item.path && !isLast ? (
                  <Link to={item.path} className="text-slate-400 transition-colors hover:text-gold-400">
                    {item.name}
                  </Link>
                ) : (
                  <span aria-current={isLast ? 'page' : undefined} className="text-slate-200">
                    {item.name}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true">
                  <Icon name="chevron-right" className="h-3.5 w-3.5 text-slate-600" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
