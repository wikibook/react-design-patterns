export type Length<T extends Array<unknown>> = T['length'];

export type SampleOne = Length<[]>; // 0
export type SampleTwo = Length<['a', 'b']>; // 2
