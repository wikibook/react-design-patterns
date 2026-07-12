// pnpm exec tsx src/pages/4/21.ts

const context1 = { token: "initial" };

function handlerA(ctx: typeof context1) {
  ctx.token = "updated by A";
}

function handlerB(ctx: typeof context1) {
  console.log(ctx.token);
}

handlerA(context1);
handlerB(context1); // 'updated by A' 출력
