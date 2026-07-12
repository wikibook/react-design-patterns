import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchVersionedPost,
  postId,
  updatePost,
  type UpdatePostParams,
  type VersionedPost,
} from './mock';

function hasVersionConflict(error: unknown): error is { code: 'VERSION_CONFLICT' } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'VERSION_CONFLICT'
  );
}

function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdatePostParams) => updatePost(params),

    onMutate: async ({ postId, title }) => {
      await queryClient.cancelQueries({ queryKey: ['versioned-post', postId] });
      const previousPost = queryClient.getQueryData<VersionedPost>([
        'versioned-post',
        postId,
      ]);

      queryClient.setQueryData<VersionedPost>(['versioned-post', postId], (old) => {
        if (!old) return old;
        return { ...old, title };
      });

      return { previousPost };
    },

    onError: (error, { postId }, context) => {
      if (hasVersionConflict(error)) {
        alert('다른 사용자가 먼저 수정했습니다. 페이지를 새로고침합니다.');
        queryClient.invalidateQueries({ queryKey: ['versioned-post', postId] });
      } else if (context?.previousPost) {
        queryClient.setQueryData(['versioned-post', postId], context.previousPost);
      }
    },

    onSuccess: (data, { postId }) => {
      queryClient.setQueryData(['versioned-post', postId], data);
    },

    onSettled: (_data, _error, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['versioned-post', postId] });
    },
  });
}

export default function VersionConflictExample() {
  const { data: post } = useQuery({
    queryKey: ['versioned-post', postId],
    queryFn: fetchVersionedPost,
  });
  const updatePostMutation = useUpdatePost();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get('title');

        if (!post || typeof title !== 'string' || title.trim() === '') {
          return;
        }

        updatePostMutation.mutate({ postId, title, version: post.version });
      }}
    >
      <h1>Version 기반 충돌 감지</h1>
      <input name="title" defaultValue={post?.title} />
      <p>현재 버전: {post?.version}</p>
      <button type="submit">저장</button>
    </form>
  );
}
