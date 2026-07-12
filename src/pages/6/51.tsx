import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePost, fetchPosts, type Post } from './mock';

function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),

    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = queryClient.getQueryData<Array<Post>>(['posts']);

      queryClient.setQueryData<Array<Post>>(['posts'], (old) => {
        if (!old) return old;
        return old.filter((post) => post.id !== postId);
      });

      return { previousPosts };
    },

    onError: (_error, _postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export default function DeletePostOptimisticExample() {
  const { data: posts } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
  const deletePostMutation = useDeletePost();

  return (
    <div>
      <h1>게시글 삭제 낙관적 업데이트</h1>
      {posts?.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <button type="button" onClick={() => deletePostMutation.mutate(post.id)}>
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}
