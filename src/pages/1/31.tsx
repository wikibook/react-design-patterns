import { thisBind } from './34';
import { Store } from './25';

export type CountReducerAction =
  | { type: 'increment'; step?: number }
  | { type: 'decrement'; step?: number }
  | { type: 'reset'; initial: number }
  | { type: 'set'; value: number };

@thisBind
export class CountStore extends Store<number> {
  constructor(value: number) {
    super(value);
  }

  protected reducer(action: CountReducerAction) {
    switch (action.type) {
      case 'increment':
        return this.value + (action.step ?? 1);
      case 'decrement':
        return this.value - (action.step ?? 1);
      case 'reset':
        return action.initial;
      case 'set':
        return action.value;
      default:
        return this.value;
    }
  }

  public dispatch(action: CountReducerAction) {
    const nextValue = this.reducer(action);

    this.setValue(nextValue);
  }
}
