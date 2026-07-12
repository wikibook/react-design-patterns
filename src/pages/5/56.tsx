import { Props } from './55';

function Component(props: Props) {
  if ('onClick' in props) {
    return <button onClick={props.onClick}>{props.label}</button>;
  }

  return (
    <a href={props.href} target={props.target}>
      link
    </a>
  );
}

// 의도하지 않은 props 조합
<Component label="Submit" onClick={() => {}} href="/home" />;
