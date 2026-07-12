// pnpm exec tsx src/pages/3/36.ts

class Singleton {
  private static instance: Singleton;
  private helloString = 'Hello, I am a singleton!';

  private constructor() {}

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public sayHello() {
    console.log(this.helloString);
  }

  // setter 메서드 추가
  public setHelloString(newString: string) {
    this.helloString = newString;
  }
}

// 사용 예시
const a = Singleton.getInstance();
const b = Singleton.getInstance();

console.log(a === b); // true

a.sayHello(); // Hello, I am a singleton!

// a에서 값을 변경
a.setHelloString('Hi, the singleton has changed!');

// b에서 호출해도 변경된 값이 출력됨
b.sayHello(); // Hi, the singleton has changed!
