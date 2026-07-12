type CountReducerAction =
  | { type: 'increment'; step?: number; isTemperature?: boolean }
  | { type: 'decrement'; step?: number; isTemperature?: boolean }
  | { type: 'reset'; initial: number }
  | { type: 'set'; value: number; isTemperature?: boolean };

export function countReducer(
  state: number,
  action: CountReducerAction,
): number {
  switch (action.type) {
    case 'increment':
      return state + (action.step ?? 1);
    case 'decrement':
      if (action.isTemperature)
        return Math.max(state - (action.step ?? 1), -273);
      return state - (action.step ?? 1);
    case 'reset':
      return action.initial;
    case 'set':
      if (action.isTemperature) return Math.max(action.value, -273);
      return action.value;
    default:
      return state;
  }
}
