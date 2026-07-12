import { useState } from 'react';

type ToggleLikeResult = {
  isLiked: boolean;
};

function toggleLike(
  postId: string,
  nextLiked: boolean,
): Promise<ToggleLikeResult> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      console.log(`${postId} 좋아요 상태 저장`, nextLiked);
      resolve({ isLiked: nextLiked });
    }, 900);
  });
}

function LikeButton({ postId }: { postId: string }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    setIsLoading(true);
    try {
      const result = await toggleLike(postId, !isLiked);
      setIsLiked(result.isLiked);
    } catch (_error) {
      alert('좋아요 처리 실패');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button type="button" onClick={handleLike} disabled={isLoading}>
      {isLoading ? '...' : isLiked ? '❤️' : '🤍'}
    </button>
  );
}

export default function PessimisticUpdateExample() {
  return (
    <div>
      <h1>전통적인 비동기 처리</h1>
      <LikeButton postId="post-1" />
    </div>
  );
}
