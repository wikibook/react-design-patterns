export function log<
  This,
  
  Args extends Array<any>,
  Return,
  T extends (this: This, ...args: Args) => Return,
>(value: T, context: ClassMethodDecoratorContext<This, T>) {
  return function (this: This, ...args: Args): Return {
    console.log(`${String(context.name)} called`);

    return value.apply(this, args);
  };
}
