import { http, HttpHandler } from "msw";
import { MSWHandler } from "./74";
import { BaseHandler } from "./75";

export class AuthHandler extends BaseHandler {
  constructor() {
    super("/account/auth/v1");
  }

  @MSWHandler
  public postSignIn(): HttpHandler {
    return http.post(`${this.prefix}/login`, async ({ request }) => {
      void request;
      // ...
    });
  }
}
