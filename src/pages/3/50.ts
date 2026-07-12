// pnpm exec tsx src/pages/3/50.ts

function factorialIterative(n: number): number {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

factorialIterative(5); // 120
