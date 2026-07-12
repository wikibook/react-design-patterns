import { QueryClient, dehydrate } from "@tanstack/react-query";
import { merge } from "lodash-es";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { HandlerChain } from "./8";

export type SSResult = GetServerSidePropsResult<{ [key: string]: unknown }>;
export type SSContext = {
  ctx: GetServerSidePropsContext;
  cookies: Record<string, string>;
  queryClient: QueryClient;
};

export class SSRHandlerChain extends HandlerChain<SSResult, SSContext> {
  constructor(ctx: GetServerSidePropsContext) {
    const cookies = parseCookies(ctx.req.headers.cookie);
    const queryClient = new QueryClient();
    super({ cookies, queryClient, ctx });
  }

  public async doHandle(): Promise<SSResult | undefined> {
    let props: { [x: string]: unknown } = {};

    for (const handler of this.handlers) {
      const res = await handler.handle(this.context);

      if (!res) continue;

      if ("props" in res) {
        props = merge(props, res.props);
      } else {
        return res;
      }
    }

    // 모든 핸들러 실행 후 queryClient에서 dehydratedState 생성
    props.dehydratedState = dehydrate(this.context.queryClient);

    return { props };
  }
}

function parseCookies(
  cookieHeader: string | undefined,
): Record<string, string> {
  if (!cookieHeader) return {};

  const out: Record<string, string> = {};

  for (const part of cookieHeader.split(";")) {
    const [rawName, ...rawValueParts] = part.split("=");
    const name = rawName?.trim();
    if (!name) continue;

    const rawValue = rawValueParts.join("=").trim();
    const unquoted =
      rawValue.length >= 2 && rawValue.startsWith('"') && rawValue.endsWith('"')
        ? rawValue.slice(1, -1)
        : rawValue;

    try {
      out[decodeURIComponent(name)] = decodeURIComponent(unquoted);
    } catch {
      out[name] = unquoted;
    }
  }

  return out;
}
