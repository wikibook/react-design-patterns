import { CountReducerAction, CountStore } from './27';

export class TemperatureStore extends CountStore {
  constructor(value: number) {
    super(value);
  }

  protected reducer(action: CountReducerAction) {
    // 우선 CountStore의 기본 reducer 실행
    const next = super.reducer(action);

    // 예: 온도는 -273 미만으로 내려갈 수 없게 한다 (절대영도 처리)
    return Math.max(next, -273);
  }
}
