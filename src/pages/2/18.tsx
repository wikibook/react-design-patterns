function useAuth() {
  return true;
}

function Button({ children, ...props }: React.ComponentPropsWithRef<'button'>) {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded" {...props}>
      {children}
    </button>
  );
}

function withAuth<P extends { isLoggedIn: boolean }>(
  Component: React.ComponentType<P>,
) {
  return function WrappedComponent(props: Omit<P, 'isLoggedIn'>) {
    const isLoggedIn = useAuth();

    return <Component {...(props as P)} isLoggedIn={isLoggedIn} />;
  };
}

function CardWrapper({
  left,
  center,
  right,
}: {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-center p-4 border rounded-lg shadow-md">
      <div className="mr-4">{left}</div>
      <div className="flex-1">{center}</div>
      <div>{right}</div>
    </div>
  );
}

function UserCard({
  isLoggedIn,
  renderButton,
}: {
  isLoggedIn: boolean;
  renderButton: (isLoggedIn: boolean) => React.ReactNode;
}) {
  return (
    <CardWrapper
      left={
        <img
          src="https://avatars.githubusercontent.com/u/144667387"
          alt="홍길동"
          width={48}
          height={48}
          className="w-12 h-12 rounded-full"
        />
      }
      center={
        <div>
          <h3>홍길동</h3>
        </div>
      }
      right={renderButton(isLoggedIn)}
    />
  );
}

const UserCardWithAuth = withAuth(UserCard);

// 사용
export default function Page() {
  return (
    <UserCardWithAuth
      renderButton={(isLoggedIn) => (
        <Button>{isLoggedIn ? '프로필' : '로그인'}</Button>
      )}
    />
  );
}
