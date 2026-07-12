import { GetServerSidePropsContext } from 'next';

export class Cookies {
  constructor(private cookies: Record<string, string | undefined>) {}

  static fromContext(ctx: GetServerSidePropsContext): Cookies {
    const cookieHeader = ctx.req.headers.cookie ?? '';
    const cookies = this.parseCookies(cookieHeader);
    return new Cookies(cookies);
  }

  get(name: string): string | undefined {
    return this.cookies[name];
  }

  static parseCookies(cookieHeader: string) {
    return cookieHeader
      .split(';')
      .map((c) => c.trim())
      .filter(Boolean)
      .reduce<Record<string, string>>((acc, cur) => {
        const idx = cur.indexOf('=');
        const key = decodeURIComponent(cur.slice(0, idx));
        const val = decodeURIComponent(cur.slice(idx + 1));
        acc[key] = val;
        return acc;
      }, {});
  }
}
