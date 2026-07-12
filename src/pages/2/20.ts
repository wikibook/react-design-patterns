// pnpm exec tsx src/pages/2/20.ts
const greet = function (name: string) {
  return `Hello, ${name}!`;
};

console.log(greet("Alice")); // Hello, Alice!

// 2. 함수에 동적으로 프로퍼티 추가
// 함수는 객체이기도 하므로, 필요에 따라 프로퍼티를 추가하거나 제거할 수 있습니다.
// 이를 통해 함수 자체에 메타데이터를 붙이거나 동작을 확장할 수 있습니다.
greet.language = "English";
greet.formal = (name: string) => `Good day, ${name}.`;

console.log(greet.language); // English
console.log(greet.formal("Alice")); // Good day, Alice.

// 3. 함수를 다른 함수의 인자로 전달
// 함수는 다른 함수의 매개변수로 전달할 수 있으며, 이를 통해 동작을 동적으로 제어할 수 있습니다.
function executeGreeting(fn: (name: string) => string, name: string) {
  console.log(fn(name));
}

executeGreeting(greet, "Bob"); // Hello, Bob!
executeGreeting(greet.formal, "Bob"); // Good day, Bob.

// 4. 함수를 반환값으로 사용
// 함수는 다른 함수를 반환할 수 있으며, 이를 활용하면 동적 동작 생성, 상태 캡슐화, 고차 함수 구현 등이 가능합니다.
function createGreeter(greeting: string) {
  return function (name: string) {
    return `${greeting}, ${name}!`;
  };
}

const morningGreet = createGreeter("Good morning");
console.log(morningGreet("Charlie")); // Good morning, Charlie!
