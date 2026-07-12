
const dogBehavior = { speak: (name: string) => console.log(`${name} 멍멍!`) };
const catBehavior = { speak: (name: string) => console.log(`${name} 야옹!`) };

class Animal {
  constructor(
    public name: string,
    private soundBehavior: { speak: (name: string) => void },
  ) {}

  speak() {
    this.soundBehavior.speak(this.name);
  }
}

// 합성 예시 : pnpm exec tsx src/pages/2/3.ts
const dog = new Animal('바둑이', dogBehavior);
dog.speak(); // 바둑이 멍멍!

const cat = new Animal('나비', catBehavior);
cat.speak(); // 나비 야옹!

export { };
