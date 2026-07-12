export type HEXString<T extends string> = T extends `#${string}` ? T : never;

declare function Component<const T extends string>({
  color,
}: {
  color: T & HEXString<T>;
}): React.ReactNode;

Component({ color: '#000000' });
//          ~~~~~~ (property) color: '#000000'
// Component({ color: '000000' });
//          ~~~~~~ TypeError : Type 'string' is not assignable to type 'never'.
