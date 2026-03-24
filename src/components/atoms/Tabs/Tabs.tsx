import { useState, type JSX } from 'react';
import { cn } from '../../lib/cn';
import type { TabsProps } from './Tabs.types';

export function Tabs({
  tabs,
  defaultTab,
  variant = 'line',
  compact = false,
  onTabChange,
  className = '',
}: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id ?? '');
  const classes = cn(
    'prisma-tabs',
    variant === 'pills' && 'prisma-tabs--pills',
    compact && 'prisma-tabs--compact',
    className,
  );

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className={classes}>
      <div className="prisma-tabs__list" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            className={cn(
              'prisma-tabs__tab',
              activeTab === tab.id && 'prisma-tabs__tab--active',
            )}
            aria-selected={activeTab === tab.id}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className="prisma-tabs__panel"
          role="tabpanel"
          hidden={activeTab !== tab.id}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
