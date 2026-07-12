interface UserAPI {
  points: number; // 조회만 허용
}

class User implements UserAPI {
  #points = 0; // private 필드

  set points(amount: number) {
    if (amount < 0) {
      throw new Error('포인트는 음수가 될 수 없습니다.');
    }
    this.#points += amount;
  }

  get points() {
    return this.#points;
  }

  someOtherMethod() {
    console.log('이 메서드는 UserAPI 인터페이스에 정의되어 있지 않습니다.');
  }
}

// 외부 코드에서 UserAPI 타입으로 제한
const user: UserAPI = new User();
// user.someOtherMethod(); // 에러: 인터페이스에 없는 메서드는 사용 불가
console.log(user.points);
