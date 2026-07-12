import type { ReactNode } from 'react';
import { useState, useTransition } from 'react';

function HomeTab() {
  return <section>홈 탭 콘텐츠입니다.</section>;
}

function ProfileTab() {
  return <section>프로필 탭 콘텐츠입니다.</section>;
}

function renderTabContent(tab: string): ReactNode {
  if (tab === 'profile') {
    return <ProfileTab />;
  }

  return <HomeTab />;
}

export default function TabContainer() {
  const [activeTab, setActiveTab] = useState('home');
  const [tabContent, setTabContent] = useState(renderTabContent('home'));
  const [isPending, startTransition] = useTransition();

  const handleTabClick = (tab: string) => {
    startTransition(() => {
      setActiveTab(tab); // 비긴급
      setTabContent(renderTabContent(tab)); // 비긴급 (무거운 렌더링)
    });
  };

  return (
    <div>
      <nav>
        <button
          onClick={() => handleTabClick('home')}
          className={isPending ? 'opacity-50' : ''}
          aria-pressed={activeTab === 'home'}
        >
          홈
        </button>
        <button
          onClick={() => handleTabClick('profile')}
          className={isPending ? 'opacity-50' : ''}
          aria-pressed={activeTab === 'profile'}
        >
          프로필
        </button>
      </nav>
      {isPending && <div className="loading-bar" />}
      {tabContent}
    </div>
  );
}
