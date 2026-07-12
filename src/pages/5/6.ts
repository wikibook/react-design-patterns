import type { HEXDigit } from './5';

export type IsHEXString<T extends string> =
  T extends `${HEXDigit}${infer Rest}`
    ? Rest extends ''
      ? true
      : IsHEXString<Rest>
    : false;

export type HEXString<T extends string> =
  T extends `#${infer Rest}`
    ? IsHEXString<Rest> extends true
      ? T
      : never
    : never;

declare function Component<const T extends string>({
  color,
}: {
  color: T & HEXString<T>;
}): React.ReactNode;

// Component({ color: '#HEX_COLOR' });
//          ~~~~~~ TypeError : Type 'string' is not assignable to type 'never'.
