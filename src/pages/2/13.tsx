const useAuth = () => {
  return true;
};

function ProfileButton() {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded">
      Profile
    </button>
  );
}

function LoginButton() {
  return (
    <button className="px-4 py-2 bg-green-500 text-white rounded">Login</button>
  );
}

function withAuthButton<P extends { button: React.ReactNode }>(
  Component: React.ComponentType<P>,
) {
  return function WrappedComponent(props: Omit<P, 'button'>) {
    const isLoggedIn = useAuth();
    return (
      <Component
        {...(props as P)}
        button={isLoggedIn ? <ProfileButton /> : <LoginButton />}
      />
    );
  };
}

// 사용 예시
function Header({ button }: { button: React.ReactNode }) {
  return (
    <header className="flex justify-between p-4 border-b">
      <h1 className="text-xl font-bold">MyApp</h1>
      {button}
    </header>
  );
}

const HeaderWithAuthButton = withAuthButton(Header);

export default function Page() {
  return (
    <div>
      <HeaderWithAuthButton />
      {/* 나머지 앱 내용 */}
    </div>
  );
}
