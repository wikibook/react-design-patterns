import { useState } from 'react';
import toast from 'react-hot-toast';
import { cn } from 'tailwind-variants';
import { TabMenuContext } from './TabMenuContext';

export function TabMenu<T extends string>({
  children,
  onTabChange,
  className,
  disabled = [],
  defaultTab,
}: {
  children: React.ReactNode;
  onTabChange?: (id: T) => void;
  className?: string;
  disabled?: Array<string>;
  defaultTab?: T;
}) {
  const [currentTab, setCurrentTab] = useState(defaultTab ?? '');

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    // 버튼 내부의 어떤 요소(예: span)에서 클릭했을 수 있으므로 closest로 button을 찾음
    const btn = target.closest('button');
    if (!btn) return;

    const tabId = btn.getAttribute('id');
    if (!tabId) return;

    // disabled 처리는 버튼의 disabled 속성으로도 보장되지만
    // 여전히 이곳에서 검사해 사용자에게 토스트로 안내함
    if (disabled.includes(tabId)) {
      toast.error('This tab is currently disabled.');
      return;
    }

    // 모든 게 정상이라면 탭 변경
    setCurrentTab(tabId);

    if (onTabChange) {
      onTabChange(tabId as T);
    }
  };

  return (
    <div
      className={cn('flex justify-center gap-8 select-none', className)}
      onClick={handleClick}
    >
      <TabMenuContext.Provider value={{ currentTab, disabled }}>
        {children}
      </TabMenuContext.Provider>
    </div>
  );
}

import { TabMenuButton } from './28';

TabMenu.Button = TabMenuButton;
