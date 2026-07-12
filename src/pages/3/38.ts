// pnpm exec tsx src/pages/3/38.ts

export function Singleton<
  Args extends Array<any>,
  Return extends object,
  T extends abstract new (...args: Args) => Return,
>(value: T, context: ClassDecoratorContext<T>): T | void {
  if (context.kind !== 'class')
    throw new Error('@Singleton can only be applied to classes');

  let instance: InstanceType<T> | undefined;

  const cls = new Proxy(value, {
    construct(target, args, newTarget) {
      instance ??= Reflect.construct(
        target,
        args,
        newTarget,
      ) as InstanceType<T>;

      return instance;
    },
  });

  Object.defineProperty(cls, 'name', { value: `Singleton_${value.name}` });

  return cls;
}

@Singleton
class ConfigService {
  private helloString = 'Hello, I am a singleton!';

  public sayHello() {
    console.log(this.helloString);
  }

  public setHelloString(newString: string) {
    this.helloString = newString;
  }
}

// 사용 예시
const a = new ConfigService();
const b = new ConfigService();

console.log(a === b); // true

a.sayHello(); // Hello, I am a singleton!

// a에서 상태 변경
a.setHelloString('Hi, singleton via decorator!');

b.sayHello(); // Hi, singleton via decorator!
