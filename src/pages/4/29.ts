// pnpm exec tsx src/pages/4/29.ts
// 예제는 prisma를 사용하였지만, 실제 DB 라이브러리와는 무관하게 DeferredQuery 클래스의 동작 원리를 보여주는 데 초점을 맞추고 있습니다.

export type User = {
  id: number;
  name: string;
};

class DeferredQuery<T> implements PromiseLike<T> {
  constructor(private readonly executor: () => Promise<T>) {}
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): PromiseLike<TResult1 | TResult2> {
    console.log('여기서 실제 쿼리가 실행됩니다.');
    return this.executor().then(onfulfilled, onrejected);
  }
}

function findUserQuery(id: number): DeferredQuery<User | null> {
  return new DeferredQuery(async () => {
    // 실제 DB 호출이라고 가정
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      id,
      name: 'Ayden',
    };
  });
}

async function main() {
  const userQuery = findUserQuery(1);
  console.log('이 시점에는 아직 DB 요청이 발생하지 않습니다.');
  const user = await userQuery;
  console.log('조회 결과:', user);
}

main();
