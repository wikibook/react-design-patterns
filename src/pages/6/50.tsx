import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPost, postId, toggleLike, type Post } from './mock';

function LikeButton({ postId }: { postId: string }) {
  const queryClient = useQueryClient();

  const { data: post } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
  });

  const likeMutation = useMutation({
    mutationFn: (postId: string) => toggleLike(postId),

    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['post', postId] });
      const previousPost = queryClient.getQueryData<Post>(['post', postId]);

      queryClient.setQueryData<Post>(['post', postId], (old) => {
        if (!old) return old;
        return {
          ...old,
          isLiked: !old.isLiked,
          likeCount: old.isLiked ? old.likeCount - 1 : old.likeCount + 1,
        };
      });

      return { previousPost };
    },

    onError: (_error, postId, onMutateResult) => {
      if (onMutateResult?.previousPost) {
        queryClient.setQueryData(['post', postId], onMutateResult.previousPost);
      }
      alert('좋아요 처리 실패');
    },

    onSettled: (_data, _error, postId) => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });

  return (
    <button type="button" onClick={() => likeMutation.mutate(postId)}>
      {post?.isLiked ? '❤️' : '🤍'} {post?.likeCount ?? 0}
    </button>
  );
}

export default function TanStackOptimisticLikeExample() {
  return (
    <div>
      <h1>TanStack Query Optimistic Update</h1>
      <LikeButton postId={postId} />
    </div>
  );
}
