import type { ReactNode } from 'react';

type ShowProps<T> = {
  when: T;
  children: ReactNode | ((value: NonNullable<T>) => ReactNode);
  fallback?: ReactNode;
};

export function Show<T>({ when, children, fallback = null }: ShowProps<T>) {
  return when
    ? typeof children === 'function'
      ? children(when)
      : children
    : fallback;
}

export default function ShowBasicExample() {
  const user = { isAdmin: true, name: '관리자' };

  return (
    <div>
      <h1>Show 기본 구현</h1>
      <Show when={user.isAdmin} fallback={<p>일반 사용자입니다.</p>}>
        <p>{user.name} 권한으로 접근했습니다.</p>
      </Show>
    </div>
  );
}
