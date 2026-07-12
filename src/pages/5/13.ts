import { Equal, Expect } from './11';
import type { HEXString } from './8';

export type HEXStringIntegrationTests =
  | Expect<Equal<HEXString<'#000'>, '#000'>>
  | Expect<Equal<HEXString<'#0000'>, '#0000'>>
  | Expect<Equal<HEXString<'#000000'>, '#000000'>>
  | Expect<Equal<HEXString<'#00000000'>, '#00000000'>>
  | Expect<Equal<HEXString<'000000'>, never>>
  | Expect<Equal<HEXString<'#00'>, never>>
  | Expect<Equal<HEXString<'#00000'>, never>>
  | Expect<Equal<HEXString<'#gggggg'>, never>>;
