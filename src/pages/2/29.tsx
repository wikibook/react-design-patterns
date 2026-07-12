import { TabMenu } from './27';

export default function Page() {
  const menuList = [
    { id: 'home', label: '홈' },
    { id: 'profile', label: '프로필' },
    { id: 'settings', label: '설정' },
  ];

  return (
    <TabMenu defaultTab="home">
      {menuList.map((tab) => (
        <TabMenu.Button key={tab.id} tab={tab} />
      ))}
    </TabMenu>
  );
}
