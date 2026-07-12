// pnpm exec tsx src/pages/4/61.ts

import { keygen } from './51';


function cache<This, Args extends Array<any>, Return>(ttl: number) {
  console.log('[1] cache factory evaluated');

  return function (
    value: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Return
    >,
  ) {
    console.log('[2] decorator applied:', context.name);

    const cacheMap = new Map<string, { value: Return; timestamp: number }>();

    return function (this: This, ...args: Args): Return {
      console.log('[3] method invoked:', context.name);
      const now = Date.now();
      const key = keygen(args);
      const cached = cacheMap.get(key);

      if (cached && now - cached.timestamp < ttl) {
        console.log('cache hit');
        return cached.value;
      } else {
        console.log('cache miss');
      }

      const result = value.apply(this, args);
      cacheMap.set(key, { value: result, timestamp: now });

      return result;
    };
  };
}

class Example {
  @cache(1000)
  run(x: number) {
    console.log('run body');
    return x * 2;
  }
}

const example = new Example();

example.run(1);
example.run(1);
