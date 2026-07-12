type TODO = {
  id: string;
  title: string;
};

export async function fetchTodo(todoId: string): Promise<TODO> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(new Error('할 일 조회에 실패했습니다.'));
        return;
      }

      resolve({ id: todoId, title: '할 일 제목' });
    }, 1000);
  });
}
