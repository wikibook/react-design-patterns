import { Props } from './57';

export function Component(props: Props) {
  if ('onClick' in props) {
    return <button onClick={props.onClick}>{props.label}</button>;
  }

  return (
    <a href={props.href} target={props.target}>
      link
    </a>
  );
}

// <Component
//   type="button"
//   label="Submit"
//   onClick={() => {}}
//   href="/home"
//   //~~~~ { type: 'button'; label: string; onClick: () => void; } 형식에 'href' 속성이 없습니다.
// />;
