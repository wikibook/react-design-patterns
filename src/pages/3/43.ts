// pnpm exec tsx src/pages/3/43.ts

export class User {
  points = 0; // 외부가 마음대로 수정 가능
}

const user = new User();
user.points = 9999; // 내부 상태를 임의로 조작
user.points = -1000; // 잘못된 값도 그대로 들어감
