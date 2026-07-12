import { createContext, useContext, useReducer } from 'react';

interface State {
  count: number;
}
type Action = { type: 'increment' | 'decrement' };

const StateContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

function StateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}

function Counter() {
  const context = useContext(StateContext);
  if (!context) throw new Error('StateContext를 찾을 수 없습니다.');
  const { state, dispatch } = context;

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}

export default function Page() {
  return (
    <StateProvider>
      <Counter />
      <Counter />
      <Counter />
    </StateProvider>
  );
}
