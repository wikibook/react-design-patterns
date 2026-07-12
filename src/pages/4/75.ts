import { HttpHandler } from 'msw';
import { MSW_HANDLERS_KEY } from './74';

type Constructor = Record<
  symbol,
  { [MSW_HANDLERS_KEY]?: Array<string | symbol> }
>;

export abstract class BaseHandler {
  public handlers: Array<HttpHandler> = [];

  constructor(protected prefix: string) {
    this.initializeHandlers();
  }

  private initializeHandlers(): void {
    // A. 클래스(생성자)에 붙은 메타데이터 가져오기
    const meta = (this.constructor as unknown as Constructor)[Symbol.metadata];

    if (!meta) return;

    // B. 아까 데코레이터가 작성한 '핸들러 명단' 가져오기
    const inherited = meta[MSW_HANDLERS_KEY];
    const handlerNames: Array<string | symbol> = Array.isArray(inherited)
      ? [...inherited]
      : [];

    // C. 명단에 있는 것만 딱 실행해서 handlers 배열에 넣기
    for (const name of handlerNames) {
      // 1. 메서드 찾기
      const method = (this as Record<string | symbol, unknown>)[name];

      // 2. 메서드 실행 (this 바인딩 유지)
      // 보통 MSW 핸들러 생성 메서드는 http.get() 같은 걸 리턴하므로 실행해줘야 함
      if (typeof method === 'function') {
        const handler = method.call(this); // this.prefix 등을 쓸 수 있게 call(this)

        // 3. 결과가 HttpHandler인지 확인 후 저장 (배열일 수도 있고 단일일 수도 있으니 처리)
        if (Array.isArray(handler)) {
          this.handlers.push(...handler);
        } else if (handler) {
          this.handlers.push(handler as HttpHandler);
        }
      }
    }
  }
}
