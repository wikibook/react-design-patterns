import { useState } from 'react';
import { ModalPortal } from './31';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>모달 열기</button>
      {isOpen && <ModalPortal closeModal={() => setIsOpen(false)} />}
      <div id="modal-root" />
    </>
  );
}
