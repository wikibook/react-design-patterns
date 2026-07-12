class Animal {
  constructor(public name: string) {}

  speak() {
    console.log(`${this.name}가 소리를 냅니다.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name}가 멍멍!`);
  }
}

class Cat extends Animal {
  speak() {
    console.log(`${this.name}가 야옹!`);
  }
}

// 상속 예시 : pnpm exec tsx src/pages/2/2.ts
const dog = new Dog('바둑이');
dog.speak(); // 바둑이가 멍멍!

const cat = new Cat('나비');
cat.speak(); // 나비가 야옹!

export {};
