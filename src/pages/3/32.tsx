import { useRef } from 'react';

export function DialogModal() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button onClick={open}>Open (useRef)</button>
      <dialog ref={dialogRef}>
        <p>다이얼로그 내용</p>
        <button onClick={close}>Close</button>
      </dialog>
    </>
  );
}
