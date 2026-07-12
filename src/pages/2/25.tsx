import { useState } from 'react';
import toast from 'react-hot-toast';
import { cn } from 'tailwind-variants';

type Tab<T> = {
  id: T;
  label: string;
};

export function TabMenu<T extends string>({
  tabList,
  initialTab,
  onTabChange,
  className,
  disabled = [],
}: {
  tabList: Array<Tab<T>>;
  initialTab?: T;
  onTabChange?: React.Dispatch<React.SetStateAction<T>>;
  className?: string;
  disabled?: Array<string>;
}) {
  const [currentTab, setCurrentTab] = useState(initialTab ?? '');

  return (
    <div className={cn('flex justify-center gap-8 select-none', className)}>
      {tabList.map((tab) => (
        <button
          key={tab.id}
          className={cn(currentTab === tab.id ? 'underbar' : 'default')}
          onClick={() => {
            if (disabled.includes(tab.id))
              return toast.error('This tab is currently disabled.');

            setCurrentTab(tab.id);

            if (onTabChange) {
              onTabChange(tab.id);
            }
          }}
          disabled={disabled.includes(tab.id)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
