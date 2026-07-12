export type Shape =
  | { type: 'circle'; radius: number }
  | { type: 'square'; size: number };

export interface Drawable {
  draw(): void;
}
