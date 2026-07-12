export type ButtonProps = {
  type: 'button';
  label: string;
  onClick: () => void;
};

export type LinkProps = {
  type: 'link';
  href: string;
  target?: string;
};

export type Props = ButtonProps | LinkProps;
