import { BaseHandler } from './7';
import { HandlerChain } from './8';

export class HandlerPipeline<T, X> {
  constructor(private handlerChain: HandlerChain<T, X>) {}

  public addHandler(handler: BaseHandler<T, X>): this {
    this.handlerChain.addHandler(handler);
    return this;
  }

  public execute(): Promise<T | undefined> {
    return this.handlerChain.doHandle();
  }
}
