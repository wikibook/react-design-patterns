// pnpm exec tsx src/pages/4/73.ts

(Symbol as { metadata: symbol }).metadata ??= Symbol('Symbol.metadata');

const PRIVATE_METADATA = new WeakMap<object, Record<string, unknown>>();


function meta<This, Args extends Array<any>, Return>(
  key: string,
  value: unknown,
) {
  return function (
    _value:
      | ((this: This, ...args: Args) => Return)
      | (new (...args: Args) => Return),
    context:
      | ClassMethodDecoratorContext<This, (...args: Args) => Return>
      | ClassDecoratorContext<new (...args: Args) => Return>,
  ) {
    const target = context.metadata ?? context;
    let metadata = PRIVATE_METADATA.get(target);

    if (!metadata) {
      metadata = {};
      PRIVATE_METADATA.set(target, metadata);
    }

    metadata[key] = value;
  };
}

@meta('a', 'x')
export class Example {
  @meta('b', 'y')
  m() {}
}

console.log(Example[Symbol.metadata]);
// { }
console.log(PRIVATE_METADATA.get(Example[Symbol.metadata]!));
// { b: 'y', a: 'x' }
