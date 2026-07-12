export type RemoveIndexSignature<T extends object> = {
  [K in keyof T as PropertyKey extends K // 제네릭 없이 PropertyKey를 직접 사용
    ? never
    : K extends PropertyKey
      ? K
      : never]: T[K];
};
