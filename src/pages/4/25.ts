// pnpm exec tsx src/pages/4/25.ts

export class Wallet {
  private balance: number = 0;

  deposit(amount: number) {
    if (amount <= 0) throw new Error("금액은 0보다 커야 합니다.");
    this.balance += amount;
  }

  withdraw(amount: number) {
    if (amount > this.balance) throw new Error("잔액이 부족합니다.");
    this.balance -= amount;
  }

  getBalance() {
    return this.balance;
  }
}

const myWallet = new Wallet();
myWallet.deposit(1000);
console.log(myWallet.getBalance()); // 1000
// myWallet.balance = 500; 오류! `balance`는 `private`
