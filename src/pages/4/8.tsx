import { BaseHandler } from './7';

export abstract class HandlerChain<T, X> {
  protected handlers: Array<BaseHandler<T, X>> = [];

  constructor(
    protected readonly context: X,
    public readonly blackBoard: Record<PropertyKey, unknown> = {},
  ) {}

  public addHandler(handler: BaseHandler<T, X>) {
    this.handlers.push(handler);
  }

  abstract doHandle(): Promise<T | undefined>;
}
