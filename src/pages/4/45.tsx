import { ModalStore } from './44';

const modalStore = new ModalStore();

export default function Page() {
  const openModal = () => {
    modalStore
      .add<'modal closed'>((removeWith) => ({
        element: (
          <div>
            <p>모달 내용</p>
            <button onClick={() => removeWith('modal closed')}>닫기</button>
          </div>
        ),
      }))
      .then((result) => {
        console.log(result); // "modal closed" 또는 undefined
      });
  };

  return (
    <div>
      <h1>Modal Store with Promise</h1>
      <button onClick={openModal}>Open Modal</button>
    </div>
  );
}
