import { Equal, Expect } from './11';
import type { IsHEXString, Length } from './8';

export type LengthTests =
  | Expect<Equal<Length<[]>, 0>>
  | Expect<Equal<Length<[unknown]>, 1>>
  | Expect<Equal<Length<[1, 2, 3]>, 3>>;

export type IsHEXStringTests =
  | Expect<Equal<IsHEXString<'000'>, true>>
  | Expect<Equal<IsHEXString<'0000'>, true>>
  | Expect<Equal<IsHEXString<'abcdef'>, true>>
  | Expect<Equal<IsHEXString<'ABCDEF'>, true>>
  | Expect<Equal<IsHEXString<'12345678'>, true>>
  | Expect<Equal<IsHEXString<'00'>, false>>
  | Expect<Equal<IsHEXString<'00000'>, false>>
  | Expect<Equal<IsHEXString<'ggg'>, false>>
  | Expect<Equal<IsHEXString<'123456789'>, false>>;
