import { useContext } from 'react';
import { cn } from 'tailwind-variants';
import { TabMenuContext } from './TabMenuContext';

type Tab<T> = {
  id: T;
  label: string;
};

export function TabMenuButton<T extends string>({
  tab,
  badgeCount,
}: {
  tab: Tab<T>;
  badgeCount?: number;
}) {
  const context = useContext(TabMenuContext);
  if (!context) throw new Error('TabMenuButton must be used within a TabMenu');

  const isActive = context.currentTab === tab.id;
  const isDisabled = context.disabled.includes(tab.id);

  return (
    <div className="relative">
      <button
        id={tab.id}
        key={tab.id}
        type="button"
        disabled={isDisabled}
        className={cn(
          isActive
            ? 'border-b-2 border-blue-500'
            : 'border-b-2 border-transparent',
        )}
      >
        {tab.label}
      </button>

      {badgeCount && badgeCount > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
          {badgeCount}
        </span>
      )}
    </div>
  );
}
