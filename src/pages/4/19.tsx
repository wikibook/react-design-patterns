import { SSContext } from "./15";
import { AccessorFactory } from "./18";
import { BaseHandler } from "./7";
import { SSResult } from "./9";

export class UserPrefetchHandler extends BaseHandler<SSResult, SSContext> {
  constructor(private readonly accessorFactory: AccessorFactory<boolean>) {
    super();
  }

  public async handle(context: SSContext) {
    const accessor = this.accessorFactory(context);
    const exists = accessor.read();

    if (exists === false) return undefined;

    // ...중략
    return undefined;
  }
}
