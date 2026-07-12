// pnpm exec tsx src/pages/3/37.ts

class Singleton {
  private static instance: Singleton;
  private helloString = 'Hello, I am a singleton!';

  constructor() {
    // 이미 인스턴스가 존재하면 기존 인스턴스 반환
    if (Singleton.instance) {
      return Singleton.instance;
    }
    // 없으면 현재 인스턴스를 저장
    Singleton.instance = this;
  }

  public sayHello() {
    console.log(this.helloString);
  }

  public setHelloString(newString: string) {
    this.helloString = newString;
  }
}

// 사용 예시
const a = new Singleton();
const b = new Singleton();

console.log(a === b); // true

a.sayHello(); // Hello, I am a singleton!

// a에서 값을 변경
a.setHelloString('Hi, singleton updated!');

// b에서 호출해도 변경된 값이 출력됨
b.sayHello(); // Hi, singleton updated!
