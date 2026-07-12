import { useSyncExternalStore } from 'react';
import { ModalStore } from './39';

export const modalStore = new ModalStore();

export function ModalContainer({ children }: { children: React.ReactNode }) {
  const modals = useSyncExternalStore(
    modalStore.subscribe,
    modalStore.getSnapshot,
    modalStore.getServerSnapshot,
  );

  return (
    <>
      {children}
      <div className="modal-container">
        {modals.map((content, index) => (
          <div
            key={index}
            className="modal"
            onClick={(e) => {
              if (e.target !== e.currentTarget) return;
              modalStore.remove();
            }}
          >
            {content}
          </div>
        ))}
      </div>
    </>
  );
}
