// pnpm exec tsx src/pages/4/22.ts

const context2 = { token: "initial" };

function handlerC({ token }: typeof context2) {
  const copiedToken = "updated by C";
  void token;
  void copiedToken;
}

function handlerD({ token }: typeof context2) {
  console.log(token);
}

handlerC(context2);
handlerD(context2); // 'initial' 출력, 이전 변경 반영 안됨
