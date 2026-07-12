import type { HEXDigit } from './5';

export type Length<T extends Array<unknown>> = T['length'];

export type IsHEXString<
  T extends string,
  Count extends Array<unknown> = [],
> = Count['length'] extends 9 // 최대 길이 초과 시 즉시 종료
  ? false
  : T extends `${HEXDigit}${infer Rest}`
    ? IsHEXString<Rest, [...Count, unknown]>
    : Length<Count> extends 3 | 4 | 6 | 8
      ? true
      : false;

export type HEXString<T extends string> = T extends `#${infer Rest}`
  ? IsHEXString<Rest> extends true
    ? T
    : never
  : never;

declare function Component<const T extends string>({
  color,
}: {
  color: T & HEXString<T>;
}): React.ReactNode;

Component({ color: '#000000' }); // ✅ 성공
Component({ color: '#000' }); // ✅ 성공 (3자리)
Component({ color: '#0000' }); // ✅ 성공 (4자리)
Component({ color: '#00000000' }); // ✅ 성공 (8자리)

// Component({ color: '#00' }); // ❌ 에러 (길이 부족)
// Component({ color: '#00000' }); // ❌ 에러 (5자리)
