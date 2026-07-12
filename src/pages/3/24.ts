// pnpm exec tsx src/pages/3/24.ts

// 공통된 행동 규약을 정의하는 인터페이스
interface Shape {
  draw(): void;
}

// Circle은 Shape의 규약을 따른다
class Circle implements Shape {
  draw() {
    console.log('원을 그립니다.');
  }
}

// Rectangle 또한 Shape의 규약을 따른다
class Rectangle implements Shape {
  draw() {
    console.log('사각형을 그립니다.');
  }
}

// 동일한 draw() 호출이지만 실제 동작은 객체의 타입에 따라 달라진다
function render(shape: Shape) {
  shape.draw();
}

render(new Circle()); // '원을 그립니다.'
render(new Rectangle()); // '사각형을 그립니다.'
