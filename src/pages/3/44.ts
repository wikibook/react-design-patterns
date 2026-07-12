// pnpm exec tsx src/pages/3/44.ts

export class User {
  #points = 0; // private 필드

  set points(amount: number) {
    if (amount < 0) {
      throw new Error("포인트는 음수가 될 수 없습니다.");
    }
    this.#points += amount;
  }

  get points() {
    return this.#points;
  }
}

const user = new User();
user.points = 10; // 올바른 방식

try {
  user.points = -20; // 에러 발생
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message); // 포인트는 음수가 될 수 없습니다.
  }
}

console.log(user.points); // 조회는 가능하지만, 직접 접근은 불가능

// 아래 코드는 "런타임 에러"가 아니라 "문법(early) 에러"라서,
// 파일이 파싱되는 단계에서 막혀 try/catch로 잡을 수 없습니다.
//
// try {
//   user.#points = -20;
// } catch (error) {
//   console.error(error);
// }
//
// 굳이 try/catch로 보고 싶다면 문자열로 런타임에 파싱되게 만들어야 합니다.
try {
  eval("user.#points = -20");
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
