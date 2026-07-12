import { DynamicShow } from "./29";

type User = {
  isLoggedIn: boolean;
  name: string;
};

function AccountMenu({ user, logout }: { user: User; logout: () => void }) {
  return (
    <>
      <DynamicShow as="button" when={user.isLoggedIn} onClick={logout}>
        로그아웃
      </DynamicShow>

      <DynamicShow as="a" when={user.isLoggedIn} href="/profile">
        내 프로필
      </DynamicShow>
    </>
  );
}

export default function App() {
  const user: User = {
    isLoggedIn: true,
    name: "홍길동",
  };

  const logout = () => {
    console.log("로그아웃");
  };

  return <AccountMenu user={user} logout={logout} />;
}
