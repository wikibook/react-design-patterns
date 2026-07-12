import { useImperativeHandle, useRef } from 'react';

export interface DialogHandle {
  open: () => void;
  close: () => void;
}

export function SafeDialog({
  ref,
}: {
  ref: React.RefObject<DialogHandle | null>;
}) {
  const internalRef = useRef<HTMLDialogElement | null>(null);

  useImperativeHandle(ref, () => ({
    open() {
      internalRef.current?.showModal();
    },
    close() {
      internalRef.current?.close();
    },
  }));

  return (
    <dialog ref={internalRef}>
      <p>내용</p>
      <button onClick={() => internalRef.current?.close()}>닫기</button>
    </dialog>
  );
}

export default function Parent() {
  const dialogRef = useRef<DialogHandle | null>(null);

  return (
    <>
      <SafeDialog ref={dialogRef} />
      <button onClick={() => dialogRef.current?.open()}>열기</button>
    </>
  );
}
