type Method<Args extends Array<unknown> = Array<unknown>, Return = unknown> = (
  ...args: Args
) => Return;

const isMethod = (value: unknown): value is Method =>
  typeof value === 'function';
const isArrowFunction = (fn: Method): boolean => !fn.prototype;

const bindMethods = (instance: object, prototype: object): void => {
  const bound = new Set<string>();

  let proto: object | null = prototype;
  while (proto && proto !== Object.prototype) {
    for (const name of Object.getOwnPropertyNames(proto)) {
      if (name === 'constructor' || bound.has(name)) continue;

      const descriptor = Object.getOwnPropertyDescriptor(proto, name);
      if (!descriptor || !isMethod(descriptor.value)) continue;

      Object.defineProperty(instance, name, {
        value: descriptor.value.bind(instance),
        writable: true,
        configurable: true,
        enumerable: false,
      });
      bound.add(name);
    }
    proto = Object.getPrototypeOf(proto);
  }

  for (const key of Object.getOwnPropertyNames(instance)) {
    if (bound.has(key)) continue;

    const descriptor = Object.getOwnPropertyDescriptor(instance, key);
    if (!descriptor || !isMethod(descriptor.value)) continue;
    if (isArrowFunction(descriptor.value)) continue;

    Object.defineProperty(instance, key, {
      value: descriptor.value.bind(instance),
      writable: descriptor.writable,
      configurable: descriptor.configurable,
      enumerable: descriptor.enumerable,
    });
  }
};

export function thisBind<
  Args extends Array<any>,
  Return extends object,
  T extends abstract new (...args: Args) => Return,
>(value: T, context: ClassDecoratorContext<T>): T {
  if (context.kind !== 'class')
    throw new Error('@thisBind can only be applied to classes');

  const cls = new Proxy(value, {
    construct(target, args, newTarget) {
      const instance = Reflect.construct(
        target,
        args,
        newTarget,
      ) as InstanceType<T>;
      bindMethods(instance, target.prototype);
      return instance;
    },
  });

  Object.defineProperty(cls, 'name', { value: `thisBound_${value.name}` });

  return cls;
}
