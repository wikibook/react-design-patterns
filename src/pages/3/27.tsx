import { Show } from './28';

export default function ShowDivExample() {
  const user = { isAdmin: true };

  return (
    <div>
      <h1>Show.div로 역할과 표현 결합</h1>
      <Show.div when={user.isAdmin} className="badge" fallback="user">
        admin
      </Show.div>
    </div>
  );
}
