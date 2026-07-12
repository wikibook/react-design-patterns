import {
  mutationOptions,
  useMutation,
  type UseMutationOptions,
} from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';

// 1. 전략 인터페이스 정의
type CommentMutationVariables = { value: string };

type CommentOptions = {
  mutationOption: Omit<
    UseMutationOptions<void, Error, CommentMutationVariables>,
    'mutationKey'
  >;
  type: 'comment' | 'reply' | 'edit';
};

// 2. 전략 구현
const createPostCommentOptions = (postId: number): CommentOptions => ({
  type: 'comment',
  mutationOption: mutationOptions({
    mutationFn: async ({ value }) => {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ value }),
      });

      if (!response.ok) {
        throw new Error('댓글 생성에 실패했습니다.');
      }
    },
  }),
});

const createReplyOptions = (commentId: number): CommentOptions => ({
  type: 'reply',
  mutationOption: mutationOptions({
    mutationFn: async ({ value }) => {
      const response = await fetch(`/api/comments/${commentId}/replies`, {
        method: 'POST',
        body: JSON.stringify({ value }),
      });

      if (!response.ok) {
        throw new Error('대댓글 생성에 실패했습니다.');
      }
    },
  }),
});

// 3. 전략을 사용하는 컨텍스트
const CommentContext = createContext<CommentOptions | null>(null);

function Comment({ initialComment = '' }: { initialComment?: string }) {
  const [commentValue, setCommentValue] = useState(initialComment);
  const commentContext = useContext(CommentContext);
  if (!commentContext) throw new Error('CommentContext가 제공되지 않았습니다.');

  const { mutate } = useMutation(commentContext.mutationOption);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ value: commentValue });
      }}
    >
      <input
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
      />
      <button type="submit">{commentContext.type}</button>
    </form>
  );
}

// 4. 사용 예시
// 게시글 댓글 섹션
export function PostCommentSection({ postId }: { postId: number }) {
  return (
    <CommentContext.Provider value={createPostCommentOptions(postId)}>
      <h2>게시글 #{postId} 댓글</h2>
      <Comment initialComment="" />
    </CommentContext.Provider>
  );
}

// 대댓글 섹션
export function ReplySection({ commentId }: { commentId: number }) {
  return (
    <CommentContext.Provider value={createReplyOptions(commentId)}>
      <h3>댓글 #{commentId}의 대댓글</h3>
      <Comment initialComment="" />
    </CommentContext.Provider>
  );
}
