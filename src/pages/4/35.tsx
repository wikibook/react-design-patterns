import { ModalStore } from '@/pages/3/39';

const modalStore = new ModalStore();

function deletePost() {
  console.log('게시물이 삭제되었습니다.');
}

function ConfirmModal({
  title,
  onConfirm,
  onCancel,
}: {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div>
      <p>{title}</p>
      <button onClick={onConfirm}>확인</button>
      <button onClick={onCancel}>취소</button>
    </div>
  );
}

export const showConfirm = () =>
  modalStore.add(
    <ConfirmModal
      title="삭제하시겠습니까?"
      onConfirm={() => {
        deletePost();
        modalStore.clear();
      }}
      onCancel={() => {
        console.log('삭제가 취소되었습니다.');
        modalStore.clear();
      }}
    />,
  );

export default function Page() {
  return (
    <div>
      <h1>게시물 제목</h1>
      <p>게시물 내용</p>
      <button onClick={showConfirm}>삭제</button>
    </div>
  );
}
