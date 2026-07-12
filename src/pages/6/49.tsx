import { useState } from 'react';

function toggleLike(postId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      console.log(`${postId} 좋아요 요청 완료`);
      if (Math.random() < 0.25) {
        reject(new Error('좋아요 처리 실패'));
        return;
      }
      resolve();
    }, 900);
  });
}

function OptimisticLikeButton({ postId }: { postId: string }) {
  const [isLiked, setIsLiked] = useState(false);
  const [message, setMessage] = useState(
    '버튼을 눌러 즉시 바뀌는 UI를 확인하세요.',
  );

  const handleLike = async () => {
    const previousState = isLiked;
    setIsLiked(!isLiked);
    setMessage('UI를 먼저 변경하고 서버 응답을 기다리는 중입니다.');

    try {
      await toggleLike(postId);
      setMessage('서버 응답이 성공했습니다.');
    } catch (_error) {
      setIsLiked(previousState);
      setMessage('요청 실패로 이전 상태로 롤백했습니다.');
    }
  };

  return (
    <div>
      <button type="button" onClick={handleLike}>
        {isLiked ? '❤️' : '🤍'}
      </button>
      <p>{message}</p>
    </div>
  );
}

export default function OptimisticUpdateExample() {
  return (
    <div>
      <h1>Optimistic UI 패턴</h1>
      <OptimisticLikeButton postId="post-1" />
    </div>
  );
}
