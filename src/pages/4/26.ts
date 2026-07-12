// pnpm exec tsx src/pages/4/26.ts

// SSR 컨텍스트 클래스
class SSRContext {
  token: string;
  userRole?: string;

  constructor(token: string) {
    this.token = token;
  }
}

// Token 갱신 핸들러
class TokenHandler {
  handle(ctx: SSRContext) {
    console.log('TokenHandler 실행 전:', ctx);
    ctx.token = 'new_access_token'; // 상태 갱신
    console.log('TokenHandler 실행 후:', ctx);
  }
}

// 사용자 정보 핸들러
class UserHandler {
  handle(ctx: SSRContext) {
    console.log('UserHandler 실행 전:', ctx);
    if (ctx.token === 'new_access_token') {
      ctx.userRole = 'admin'; // 이전 단계에서 갱신된 토큰을 활용
    }
    console.log('UserHandler 실행 후:', ctx);
  }
}

// SSR 파이프라인 실행
const context = new SSRContext('initial');

const tokenHandler = new TokenHandler();
const userHandler = new UserHandler();

tokenHandler.handle(context);
userHandler.handle(context);

console.log('최종 컨텍스트:', context);
/*
  TokenHandler 실행 전: { userRole: undefined, token: 'initial' }
  TokenHandler 실행 후: { userRole: undefined, token: 'new_access_token' }
  UserHandler 실행 전: { userRole: undefined, token: 'new_access_token' }
  UserHandler 실행 후: { userRole: 'admin', token: 'new_access_token' }
  최종 컨텍스트: { userRole: 'admin', token: 'new_access_token' }
*/
