export type GetFirstChar<T extends string> = T extends `${infer First}${string}`
  ? First
  : never;

export type ExampleOne = GetFirstChar<'#FF0000'>; // '#'
export type ExampleTwo = GetFirstChar<'00FF00'>; // '0'
