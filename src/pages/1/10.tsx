export class Store<T> {
  constructor(private _state: T) {}

  get state() {
    return this._state;
  }

  set state(value: ((_state: T) => T) | T) {
    const nextValue =
      typeof value === 'function'
        ? (value as (prev: T) => T)(this._state)
        : value;

    this._state = nextValue;
  }
}
