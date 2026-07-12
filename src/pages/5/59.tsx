import { Props } from './57';

export function Component(props: Props) {
  if (props.type === 'button') {
    return <button onClick={props.onClick}>{props.label}</button>;
  }

  return (
    <a href={props.href} target={props.target}>
      link
    </a>
  );
}
