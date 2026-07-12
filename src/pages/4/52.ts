declare function classDecorator<
  Args extends Array<any>,
  Return,
  T extends abstract new (...args: Args) => Return,
>(value: T, context: ClassDecoratorContext<T>): typeof value | void;

declare function methodDecorator<
  This,
  Args extends Array<any>,
  Return,
  T extends (this: This, ...args: Args) => Return,
>(value: T, context: ClassMethodDecoratorContext<This, T>): T | void;

declare function fieldDecorator<This, Value>(
  value: Value,
  context: ClassFieldDecoratorContext<This, Value>,
): ((initialValue: Value) => Value) | void;

declare function accessorDecorator<This, Value>(
  value: {
    get?: (this: This) => Value;
    set?: (this: This, value: Value) => void;
  },
  context: ClassAccessorDecoratorContext<This, Value>,
): typeof value | void;
