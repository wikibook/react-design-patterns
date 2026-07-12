import type { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { cn } from 'tailwind-variants';

type Tab<T> = {
  id: T;
  label: string;
};

export function TabMenu<T extends string>({
  tabList,
  currentTab,
  onTabChange,
  className,
  disabled = [],
}: {
  tabList: Array<Tab<T>>;
  currentTab: T;
  onTabChange: Dispatch<SetStateAction<T>>;
  className?: string;
  disabled?: Array<string>;
}) {
  return (
    <div className={cn('flex justify-center gap-8 select-none', className)}>
      {tabList.map((tab) => (
        <button
          key={tab.id}
          className={cn(currentTab === tab.id ? 'underbar' : 'default')}
          onClick={() => {
            if (disabled.includes(tab.id))
              return toast.error('This tab is currently disabled.');

            onTabChange(tab.id);
          }}
          disabled={disabled.includes(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
