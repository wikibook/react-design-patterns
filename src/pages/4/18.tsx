import { GetServerSidePropsContext } from "next";
import { SSContext } from "./15";
import { BlackBoardAccessor } from "./16";
import { BaseHandler } from "./7";
import { SSResult } from "./9";
import { RedirectObj } from "./11";

export type AccessorFactory<T> = (ctx: SSContext) => BlackBoardAccessor<T>;

export class TokenRefreshHandler extends BaseHandler<SSResult, SSContext> {
  constructor(
    private action: RedirectObj | AccessorFactory<boolean> = {
      redirect: { destination: "/", permanent: false },
    },
  ) {
    super();
  }

  public async handle(context: SSContext) {
    if (!context.cookies["access_token"]) {
      if (context.cookies["refresh_token"]) {
        await this.serverSideReissue(context.ctx, context.cookies);
      } else {
        return this.executeAction(context);
      }
    }

    if (!context.cookies["access_token"]) {
      return this.executeAction(context);
    }

    return undefined;
  }

  private executeAction(context: SSContext) {
    if ("redirect" in this.action) return this.action;

    const accessor = this.action(context);
    accessor.write(false);

    return undefined;
  }

  private async serverSideReissue(
    ctx: GetServerSidePropsContext,
    cookies: Record<string, string>,
  ): Promise<void> {
    void ctx;
    void cookies;
    // ...중략
  }

  // ...중략
}
