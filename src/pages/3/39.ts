import { thisBind } from '../1/34';
import { Singleton } from './38';

type Listener = () => void;

@thisBind
@Singleton
export class ModalStore<T = React.ReactNode> {
  private value: Array<T> = [];
  private listeners = new Set<Listener>();

  // 아이템 추가
  public add(item: T) {
    this.value = [...this.value, item];
    this.notify();
  }

  // 아이템 제거
  public remove() {
    if (this.value.length === 0) return;
    this.value = this.value.slice(0, -1);
    this.notify();
  }

  // 상태 초기화
  public clear() {
    this.value = [];
    this.notify();
  }

  public getSnapshot() {
    return this.value;
  }

  public getServerSnapshot() {
    return [] as Array<T>;
  }

  public subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener); // 구독 해제
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }
}
