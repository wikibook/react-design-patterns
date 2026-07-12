// pnpm exec tsx src/pages/4/72.ts

import { BaseExample, Tag } from "./71";

export class ExtendExample extends BaseExample {
  // 1️⃣ 부모 메타데이터 그대로 상속 (재정의 없음)
  run() {}

  // 2️⃣ 부모 메타데이터 덮어쓰기
  @Tag("extend:stop")
  stop() {}

  // 3️⃣ 자식에서 새 메타데이터 추가
  @Tag("extend:pause")
  pause() {}
}

const metadata = ExtendExample[Symbol.metadata];

if (metadata) {
  console.log(metadata); // { stop: 'extend:stop', pause: 'extend:pause' }
  console.log(metadata.run); // 'base:run'
}
