import { useCustomSuspenseQueries } from '../17';
import { fetchTodo } from '../21/fetchTodo';

export function TodoItem({ todoIds }: { todoIds: Array<string> }) {
  const results = useCustomSuspenseQueries({
    queries: todoIds.map((todoId) => ({
      queryKey: ['todo', todoId],
      queryFn: () => fetchTodo(todoId),
    })),
  });

  return (
    <div>
      {results.map((result, index) => (
        <div key={index}>{result.title}</div>
      ))}
    </div>
  );
}
