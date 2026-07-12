// pnpm exec tsx src/pages/4/71.ts

(Symbol as { metadata: symbol }).metadata ??= Symbol('Symbol.metadata');


export function Tag<This, Args extends Array<any>, Return>(tag: string) {
  return function (
    _value: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (...args: Args) => Return>,
  ) {
    context.metadata[context.name] = tag;
  };
}

export class BaseExample {
  @Tag('base:run')
  run() {}

  @Tag('base:stop')
  stop() {}

  idle() {} // 메타데이터 없음
}

console.log(BaseExample[Symbol.metadata]);
