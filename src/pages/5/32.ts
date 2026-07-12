export type Roll<T> = { [K in keyof T]: T[K] } & {};
