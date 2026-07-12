function useUserRole() {
  // 실제 구현에서는 사용자 역할을 가져오는 로직이 들어갑니다.
  return "admin"; // 예시로 admin 역할을 반환
}

function withPermission<
  P extends {
    isAllowed: boolean;
  },
>(Component: React.ComponentType<P>, requiredRole: string) {
  return function PermittedComponent(props: Omit<P, "isAllowed">) {
    const userRole = useUserRole();
    const isAllowed = userRole === requiredRole;

    return <Component {...(props as P)} isAllowed={isAllowed} />;
  };
}

function PermissionButton({
  isAllowed,
  children,
  disabled,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & {
  isAllowed: boolean;
}) {
  return (
    <button {...props} disabled={disabled || !isAllowed}>
      {isAllowed ? children : "권한 없음"}
    </button>
  );
}

const AdminButton = withPermission(PermissionButton, "admin");

function AdminPanel() {
  return <AdminButton>관리자 설정</AdminButton>;
}

export default function Page() {
  return (
    <div className="p-4">
      <AdminPanel />
    </div>
  );
}
