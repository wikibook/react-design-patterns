// pnpm exec tsx src/pages/4/30.ts

async function demo() {
  const a = await 42;
  const b = await Promise.resolve(42);
  console.log(a, b);
}

demo();
