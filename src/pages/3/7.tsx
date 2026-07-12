import { For } from "./6";

type TODO = {
  id: number;
  text: string;
};

export function TodoList({ todos }: { todos: Array<TODO> }) {
  return (
    <For each={todos} fallback={<div>할 일이 없습니다.</div>}>
      {(todo) => <div key={todo.id}>{todo.text}</div>}
    </For>
  );
}
