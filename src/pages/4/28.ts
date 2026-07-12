// pnpm exec tsx src/pages/4/28.ts

console.log('A');

async function demo() {
  console.log('B1');
  await 0;
  console.log('B2');
}

demo();
console.log('C');

// 출력 순서: A → B1 → C → B2
