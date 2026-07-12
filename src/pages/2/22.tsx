import { Component } from 'react';

// 정적 메서드 패턴 예시
class Button extends Component<{ children: React.ReactNode }> {
  render() {
    return <button>{this.props.children}</button>;
  }

  // 클래스 내부에 정적 메서드 형태로 서브 컴포넌트 선언
  static Icon = ({ symbol = '⭐' }) => <span>{symbol}</span>;

  static Label = ({ text = 'Click me' }) => <span>{text}</span>;
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Button>
          <Button.Icon symbol="🔔" /> <Button.Label text="Notify" />
        </Button>
      </div>
    );
  }
}
