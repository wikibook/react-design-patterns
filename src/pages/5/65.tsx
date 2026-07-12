import { ButtonProps, LinkProps, Props } from './64';

function Button(props: Omit<ButtonProps, 'type'>) {
  return <button onClick={props.onClick}>{props.label}</button>;
}

function Link(props: Omit<LinkProps, 'type'>) {
  return (
    <a href={props.href} target={props.target}>
      link
    </a>
  );
}

export function ComponentFactory(props: Props) {
  switch (props.type) {
    case 'button':
      return <Button label={props.label} onClick={props.onClick} />;

    case 'link':
      return <Link href={props.href} target={props.target} />;
  }
}
