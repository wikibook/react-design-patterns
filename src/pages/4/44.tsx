import { thisBind } from '@/pages/1/34';
import { Singleton } from '@/pages/3/38';
import { useSyncExternalStore } from 'react';

type Callback = () => void;

type Store = Array<ModalStoreProps>;

export interface ModalStoreProps {
  element: React.ReactNode;
  dismissCallback?: () => unknown;
}

@thisBind
@Singleton
export class ModalStore {
  private store: Store = [];
  private listeners = new Set<Callback>();
  private abortControllers = new Map<ModalStoreProps, AbortController>();

  public add<T>(
    dialogFactory: (removeWith: (value: T) => void) => ModalStoreProps,
  ): Promise<T | undefined> {
    return new Promise<T | undefined>((resolve) => {
      let dialogProps: ModalStoreProps = {} as ModalStoreProps;
      let isResolved = false;

      const abortController = new AbortController();

      const notify = () => {
        this.store = [...this.store];
        this.listeners.forEach((l) => l());
      };

      const cleanupDialog = () => {
        const index = this.store.indexOf(dialogProps);
        if (index !== -1) {
          this.store.splice(index, 1);
        }

        const controller = this.abortControllers.get(dialogProps);
        if (controller) {
          this.abortControllers.delete(dialogProps);
        }

        notify();
      };

      const resolveOnce = (fn: () => void) => {
        if (isResolved) return;
        isResolved = true;
        fn();
      };

      abortController.signal.addEventListener('abort', () => {
        resolveOnce(() => {
          cleanupDialog();
          resolve(undefined);
        });
      });

      const removeWith = (value: T) => {
        resolveOnce(() => {
          cleanupDialog();
          resolve(value);
        });
      };

      dialogProps = dialogFactory(removeWith);

      this.store.push(dialogProps);
      this.abortControllers.set(dialogProps, abortController);
      notify();
    });
  }

  public remove() {
    const props = this.store.pop();
    if (!props) return;

    const controller = this.abortControllers.get(props);
    if (controller) {
      controller.abort();
    }
  }

  public clear() {
    const propsList = [...this.store];
    for (const props of propsList) {
      const controller = this.abortControllers.get(props);
      if (controller) {
        controller.abort();
      }
    }
    this.store = [];
    this.abortControllers.clear();
    this.listeners.forEach((l) => l());
  }

  public getSnapshot() {
    return this.store;
  }

  public getServerSnapshot() {
    return [] as Store;
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const modalStore = new ModalStore();

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const modals = useSyncExternalStore(
    modalStore.subscribe,
    modalStore.getSnapshot,
    modalStore.getServerSnapshot,
  );

  return (
    <>
      {children}
      <div className="modal-container">
        {modals.map(({ element, dismissCallback }, index) => (
          <div
            key={index}
            className="modal"
            onClick={(e) => {
              if (e.target !== e.currentTarget) return;
              if (dismissCallback) dismissCallback();
              modalStore.remove();
            }}
          >
            {element}
          </div>
        ))}
      </div>
    </>
  );
}
