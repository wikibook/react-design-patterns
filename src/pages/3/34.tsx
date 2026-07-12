import { toast } from 'react-hot-toast';

export default function ToastCommandExample() {
  return (
    <div>
      <h1>명령형 토스트 호출</h1>
      <button
        type="button"
        onClick={() => toast.success('저장이 완료되었습니다.')}
      >
        저장 완료 토스트 표시
      </button>
    </div>
  );
}
