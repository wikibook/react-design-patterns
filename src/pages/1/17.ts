import { countReducer, type CountReducerAction } from './15';

export function temperatureReducer(
  state: number,
  action: CountReducerAction,
): number {
  const nextState = countReducer(state, action);

  if (nextState < -273) {
    return state; // Prevent state change
  }

  return nextState;
}
