// pnpm exec tsx src/pages/3/51.ts

function factorial(n: number): number {
  if (n <= 1) return 1; // 종료 조건
  return n * factorial(n - 1); // 자기 자신 호출
}

factorial(5); // 120
