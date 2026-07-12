import './37';

// 5/4/5 의 선언을 제거하면 다음과 같은 에러가 발생합니다.

'Owned'.lowerFirst();
//      ~~~~~~~~~~~ Property 'lowerFirst' does not exist on type '"Owned"'.

'owned'.upperFirst();
//      ~~~~~~~~~~~ Property 'upperFirst' does not exist on type '"owned"'.

// pnpm exec tsx src/pages/5/38.ts
console.log('Owned'.lowerFirst());
