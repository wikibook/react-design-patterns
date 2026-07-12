import React, { useRef } from 'react';

function DialogModal({
  dialogRef,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}) {
  return (
    <dialog ref={dialogRef}>
      <p>다이얼로그 내용</p>
      <button onClick={() => dialogRef.current?.close()}>닫기</button>
    </dialog>
  );
}

export function ParentComponent() {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => modalRef.current?.showModal();

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <DialogModal dialogRef={modalRef} />
    </>
  );
}

export default function Page() {
  return <ParentComponent />;
}
