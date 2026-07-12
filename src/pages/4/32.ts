// pnpm exec tsx src/pages/4/32.ts

console.log('start');

setTimeout(() => {
  console.log('timeout');
}, 0);

(async function () {
  console.log('async-1');
  await 0;
  console.log('async-2');
})();

Promise.resolve().then(() => {
  console.log('promise');
});

console.log('end');

// 출력 순서:
// start → async-1 → end → async-2 → promise → timeout
