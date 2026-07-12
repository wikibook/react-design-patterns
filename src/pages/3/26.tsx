import { Show } from './25';

export default function ShowWrapperExample() {
  const user = { isAdmin: true };

  return (
    <div>
      <h1>래퍼가 깊어지는 Show 사용</h1>
      <div className="badge">
        <Show when={user.isAdmin} fallback="user">
          admin
        </Show>
      </div>
    </div>
  );
}
