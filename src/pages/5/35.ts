type TUser = {
  name: string;
  age: number;
  address: string;
};

export class User implements TUser {
  constructor(
    public name: string,
    public age: number,
    public address: string,
  ) {}
}
