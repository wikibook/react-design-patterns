type StringFilter<T> = T extends string ? T : never;

export type Result = StringFilter<'hello' | 42 | 'world' | false>;
//          ~~~~~~ 'hello' | 'world'
