import { Roll } from './32';

type ButtonBaseProps = {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
};

type ButtonEventProps = {
  onClick?: () => void;
  onHover?: () => void;
};

export type ButtonProps1 = ButtonBaseProps &
  ButtonEventProps &
  React.HTMLAttributes<HTMLButtonElement>;
//   ~~~~~~~~~~~ ButtonBaseProps & ButtonEventProps & React.HTMLAttributes<HTMLButtonElement>;

export type ButtonProps2 = Roll<
  ButtonBaseProps & ButtonEventProps & React.HTMLAttributes<HTMLButtonElement>
>;
//   ~~~~~~~~~~~ {
//                 variant: 'primary' | 'secondary';
//                 size: 'sm' | 'md' | 'lg';
//                 onClick?: () => void;
//                 onHover?: () => void;
//                 // ...중략
//               }
