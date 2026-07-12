// pnpm exec tsx src/pages/4/23.ts

function checkParameter(arg: string) {
  arg = "new value";
  console.log(arg); // 'new value'
}

const original = "original";
checkParameter(original);
console.log(original); // 'original'
