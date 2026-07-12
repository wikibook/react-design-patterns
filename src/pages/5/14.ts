type Example<T> = T extends string ? number : boolean;

export type Result = Example<'hello' | 42>;
//          ~~~~~~ number | boolean
