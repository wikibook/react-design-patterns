import { useRef } from 'react';

export function UnSafeDialog({
  ref,
}: {
  ref: React.RefObject<HTMLDialogElement | null>;
}) {
  return (
    <dialog ref={ref}>
      <p>내용</p>
    </dialog>
  );
}

export default function Parent() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // 외부에서 DOM 내부를 마음껏 조작할 수 있음
  const breakComponent = () => {
    if (!dialogRef.current) return;
    dialogRef.current.innerHTML = '<h1>망가짐</h1>';
    dialogRef.current.style.background = 'red';
    dialogRef.current.showModal();
  };

  return (
    <>
      <UnSafeDialog ref={dialogRef} />
      <button onClick={breakComponent}>망가뜨리기</button>
    </>
  );
}
