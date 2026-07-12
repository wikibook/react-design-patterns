import { LooseStringAutocomplete } from './30';

type HeaderValue = string | number | Array<string>;

type GetServerSidePropsContext = {
  req: {
    headers: {
      cookie?: string;
    };
  };
  res: {
    getHeader(name: string): HeaderValue | undefined;
    setHeader(name: string, value: HeaderValue): void;
  };
};

type CookiePageProps = {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  locale: string | undefined;
};

class Cookies {
  constructor(private cookies: Record<string, string | undefined>) {}

  static fromContext(ctx: GetServerSidePropsContext): Cookies {
    const cookieHeader = ctx.req.headers.cookie ?? '';
    const cookies = this.parseCookies(cookieHeader);
    return new Cookies(cookies);
  }

  get(
    name: LooseStringAutocomplete<'access_token' | 'refresh_token'>,
  ): string | undefined {
    return this.cookies[name];
  }

  private static parseCookies(cookieHeader: string) {
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

  static setCookieToContext(
    ctx: GetServerSidePropsContext,
    name: LooseStringAutocomplete<'access_token' | 'refresh_token'>,
    value: string | undefined,
  ) {
    const cookieHeader = ctx.req.headers.cookie ?? '';
    const cookies = this.parseCookies(cookieHeader);

    if (value === undefined) {
      delete cookies[name];
    } else {
      cookies[name] = value;
    }

    ctx.req.headers.cookie = Object.entries(cookies)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('; ');

    const encodedName = encodeURIComponent(name);
    const nextSetCookie =
      value === undefined
        ? `${encodedName}=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
        : `${encodedName}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax`;

    const prevSetCookie = ctx.res.getHeader('Set-Cookie');
    const prevSetCookieList = Array.isArray(prevSetCookie)
      ? prevSetCookie.map(String)
      : prevSetCookie
        ? [String(prevSetCookie)]
        : [];

    const mergedSetCookie = prevSetCookieList
      .filter((cookie) => {
        const idx = cookie.indexOf('=');

        if (idx < 0) {
          return true;
        }

        const prevName = cookie.slice(0, idx).trim();
        return prevName !== name && prevName !== encodedName;
      })
      .concat(nextSetCookie);

    ctx.res.setHeader('Set-Cookie', mergedSetCookie);
  }
}

function getServerSideProps(ctx: GetServerSidePropsContext): {
  props: CookiePageProps;
} {
  Cookies.setCookieToContext(ctx, 'access_token', 'access_token_value');
  Cookies.setCookieToContext(ctx, 'refresh_token', 'refresh_token_value');
  Cookies.setCookieToContext(ctx, 'NEXT_LOCALE', 'en');

  const cookies = Cookies.fromContext(ctx);

  const accessToken = cookies.get('access_token');
  const refreshToken = cookies.get('refresh_token');
  const locale = cookies.get('NEXT_LOCALE');

  return {
    props: {
      accessToken,
      refreshToken,
      locale,
    },
  };
}

function createMockContext(): GetServerSidePropsContext {
  const headers = new Map<string, HeaderValue>();

  return {
    req: {
      headers: {
        cookie: '',
      },
    },
    res: {
      getHeader(name) {
        return headers.get(name);
      },
      setHeader(name, value) {
        headers.set(name, value);
      },
    },
  };
}

export default function Page() {
  const { props } = getServerSideProps(createMockContext());
  const { accessToken, refreshToken, locale } = props;

  return (
    <div>
      <p>Access Token: {accessToken ?? '없음'}</p>
      <p>Refresh Token: {refreshToken ?? '없음'}</p>
      <p>Locale: {locale ?? '없음'}</p>
    </div>
  );
}
