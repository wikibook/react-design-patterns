export function keygen<Args extends Array<any>>(args: Args): string {
  try {
    return JSON.stringify(args);
  } catch {
    return args.map((arg) => `${typeof arg}:${String(arg)}`).join('|');
  }
}

export function cache<
  This,
  Args extends Array<any>,
  Return,
  T extends (this: This, ...args: Args) => Return,
>(value: T, _context: ClassMethodDecoratorContext<This, T>) {
  const cacheMap = new Map<string, { value: Return }>();
  return function (this: This, ...args: Args): Return {
    const key = keygen(args);

    const cached = cacheMap.get(key);

    if (cached !== undefined) {
      return cached.value;
    }

    const result = value.apply(this, args);

    cacheMap.set(key, { value: result });

    return result;
  };
}
