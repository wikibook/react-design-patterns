import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deletePost, fetchPosts, type Post } from './mock';

function useDeletePostWithToast() {
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

      toast.success('게시글을 삭제했습니다');
      return { previousPosts };
    },

    onError: (_error, _postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
      toast.error('삭제 실패: 게시글을 복구했습니다');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export default function DeletePostToastExample() {
  const { data: posts } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
  const deletePostMutation = useDeletePostWithToast();

  return (
    <div>
      <h1>Toast 알림 통합</h1>
      {posts?.map((post) => (
        <div key={post.id}>
          <span>{post.title}</span>{' '}
          <button type="button" onClick={() => deletePostMutation.mutate(post.id)}>
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}
