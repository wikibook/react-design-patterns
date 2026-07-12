// pnpm exec tsx src/pages/4/55.tsx

import { log } from "./54";

export class Example {
  @log
  run() {
    console.log("running");
  }
}

const example = new Example();
example.run();
