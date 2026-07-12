import { Component } from 'react';

class Counter extends Component<object, { count: number }> {
  // 클래스 멤버로 상태 정의
  state = {
    count: 0,
  };

  // 상태를 변경하는 메소드
  increment = () => {
    this.setState(({ count }) => ({ count: count + 1 }));
  };

  decrement = () => {
    this.setState(({ count }) => ({ count: count - 1 }));
  };

  render() {
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
      </div>
    );
  }
}

export default function Page() {
  return <Counter />;
}
