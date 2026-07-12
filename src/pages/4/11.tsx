import { GetServerSidePropsContext } from "next";
import { BaseHandler } from "./7";
import { SSContext, SSResult } from "./9";

export type RedirectObj = {
  redirect: {
    destination: string;
    permanent: boolean;
  };
};

export class TokenRefreshHandler extends BaseHandler<SSResult, SSContext> {
  constructor(
    private redirectObj: RedirectObj = {
      redirect: {
        destination: "/",
        permanent: false,
      },
    },
  ) {
    super();
  }

  public async handle(context: SSContext) {
    if (!context.cookies["access_token"]) {
      if (context.cookies["refresh_token"]) {
        // 리프레시 토큰이 있으면 액세스 토큰 재발급 시도
        await this.serverSideReissue(context.ctx, context.cookies);
      } else {
        // 둘 다 없으면 index로 리다이렉트
        return this.redirectObj;
      }
    }

    if (!context.cookies["access_token"]) {
      return this.redirectObj;
    }

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
}
