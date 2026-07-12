type State = { count: number };
type Action = { type: 'INCREMENT' | 'DECREMENT' };

const initialState: State = { count: 0 };

export const counterReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};