import { Roll } from './32';

type BaseProps = {
  id: string;
  name: string;
};

type ExtendedProps = {
  email: string;
  age: number;
};

export type UserProps1 = BaseProps & ExtendedProps;
//   ~~~~~~~~~ BaseProps & ExtendedProps

export type UserProps2 = Roll<BaseProps & ExtendedProps>;
//   ~~~~~~~~~ { id: string; name: string; email: string; age: number; }
