import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createComment, fetchComments, type Comment } from './mock';

function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => createComment(text),

    onMutate: async (text) => {
      await queryClient.cancelQueries({ queryKey: ['comments', 'post-1'] });
      const previousComments = queryClient.getQueryData<Array<Comment>>([
        'comments',
        'post-1',
      ]);
      const tempId = `temp-${Date.now()}`;
      const tempComment: Comment = {
        id: tempId,
        text,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Array<Comment>>(['comments', 'post-1'], (old) => {
        if (!old) return [tempComment];
        return [tempComment, ...old];
      });

      return { previousComments, tempId };
    },

    onError: (_error, _text, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(['comments', 'post-1'], context.previousComments);
      }
    },

    onSuccess: (data, _text, context) => {
      queryClient.setQueryData<Array<Comment>>(['comments', 'post-1'], (old) => {
        if (!old) return [data];
        return old.map((comment) =>
          comment.id === context?.tempId ? data : comment,
        );
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', 'post-1'] });
    },
  });
}

export default function AddCommentOptimisticExample() {
  const { data: comments } = useQuery({
    queryKey: ['comments', 'post-1'],
    queryFn: fetchComments,
  });
  const addCommentMutation = useAddComment();

  return (
    <div>
      <h1>댓글 추가 낙관적 업데이트</h1>
      <button type="button" onClick={() => addCommentMutation.mutate('새 댓글')}>
        댓글 추가
      </button>
      <ul>
        {comments?.map((comment) => <li key={comment.id}>{comment.text}</li>)}
      </ul>
    </div>
  );
}
