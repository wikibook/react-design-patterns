import { Suspense } from 'react';
import { ErrorBoundary } from '../5';
import { TodoItem } from './TodoItem';

export default function Page() {
  const todoIds = ['1', '2', '3'];

  return (
    <div>
      {todoIds.map((id) => (
        <ErrorBoundary
          key={id}
          fallback={<div>할 일 정보를 가져오는 데 실패했습니다</div>}
        >
          <Suspense fallback={<div>로딩...</div>}>
            <TodoItem todoId={id} />
          </Suspense>
        </ErrorBoundary>
      ))}
    </div>
  );
}
