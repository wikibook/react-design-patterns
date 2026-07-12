import { useCustomSuspenseQuery } from '../17';
import { fetchTodo } from './fetchTodo';

export function TodoItem({ todoId }: { todoId: string }) {
  const todo = useCustomSuspenseQuery({
    queryKey: ['todo', todoId],
    queryFn: () => fetchTodo(todoId),
  });

  return <div>{todo.title}</div>;
}
