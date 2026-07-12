export {};

declare global {
  interface String {
    upperFirst(): string;
    lowerFirst(): string;
  }
}
