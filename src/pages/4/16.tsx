export abstract class BlackBoardAccessor<T> {
  constructor(
    protected readonly blackBoard: Record<PropertyKey, unknown>,
    protected readonly key: PropertyKey,
  ) {}

  public read(): T | undefined {
    return this.blackBoard[this.key] as T | undefined;
  }

  public write(value: T): void {
    this.blackBoard[this.key] = value;
  }
}
