import { BaseHandler } from './7';
import { SSContext, SSResult } from './9';

export class AdminRedirectHandler extends BaseHandler<SSResult, SSContext> {
  public async handle(context: SSContext) {
    const data = context.queryClient.getQueryData<{ role: string }>([
      'user',
      'me',
    ]);

    if (data?.role === 'ROLE_USER') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return undefined;
  }
}
