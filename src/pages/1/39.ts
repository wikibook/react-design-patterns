// 1. 전략 인터페이스 정의
interface DiscountStrategy {
  calculate(price: number): number;
}

// 2. 전략 구현 클래스
class NoDiscount implements DiscountStrategy {
  calculate(price: number): number {
    return price; // 할인 없음
  }
}

class PercentageDiscount implements DiscountStrategy {
  constructor(private percent: number) {}

  calculate(price: number): number {
    return price * (1 - this.percent / 100);
  }
}

class FixedDiscount implements DiscountStrategy {
  constructor(private amount: number) {}

  calculate(price: number): number {
    return Math.max(0, price - this.amount);
  }
}

// 3. 전략을 사용하는 실행 주체
class PriceCalculator {
  constructor(private strategy: DiscountStrategy) {}

  setStrategy(strategy: DiscountStrategy) {
    this.strategy = strategy; // 런타임에 전략 변경 가능
  }

  calculatePrice(price: number): number {
    return this.strategy.calculate(price);
  }
}

// 4. 사용 예시 : pnpm exec tsx src/pages/1/39.ts
const calculator = new PriceCalculator(new NoDiscount());
console.log(calculator.calculatePrice(1000)); // 1000

calculator.setStrategy(new PercentageDiscount(20));
console.log(calculator.calculatePrice(1000)); // 800

calculator.setStrategy(new FixedDiscount(300));
console.log(calculator.calculatePrice(1000)); // 700
