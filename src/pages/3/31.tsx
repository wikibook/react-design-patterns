import { createPortal } from 'react-dom';
import styles from './31.module.css';

function Modal({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p>모달 내용</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export function ModalPortal({ closeModal }: { closeModal: () => void }) {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) return null; // 또는 throw new Error('modal-root not found');

  return createPortal(<Modal onClose={closeModal} />, modalRoot);
}
