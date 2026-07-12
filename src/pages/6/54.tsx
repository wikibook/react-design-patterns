import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAuthorPosts, fetchUser, updateUserName, userId, type User } from './mock';

function useUpdateUserNameSimple() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name }: { userId: string; name: string }) => updateUserName(name),

    onMutate: async ({ userId, name }) => {
      await queryClient.cancelQueries({ queryKey: ['user', userId] });
      const previousUser = queryClient.getQueryData<User>(['user', userId]);

      queryClient.setQueryData<User>(['user', userId], (old) => {
        if (!old) return old;
        return { ...old, name };
      });

      return { previousUser };
    },

    onError: (_error, { userId }, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(['user', userId], context.previousUser);
      }
    },

    onSettled: (_data, _error, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      queryClient.invalidateQueries({ queryKey: ['posts-with-author'] });
    },
  });
}

export default function PartialInvalidationExample() {
  const { data: user } = useQuery({ queryKey: ['user', userId], queryFn: fetchUser });
  const { data: posts } = useQuery({
    queryKey: ['posts-with-author'],
    queryFn: fetchAuthorPosts,
  });
  const updateUserNameMutation = useUpdateUserNameSimple();

  return (
    <div>
      <h1>Partial Invalidation 패턴</h1>
      <p>사용자 이름: {user?.name}</p>
      <button
        type="button"
        onClick={() =>
          updateUserNameMutation.mutate({ userId, name: `부분 무효화 ${Date.now() % 100}` })
        }
      >
        사용자 쿼리만 먼저 변경
      </button>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            {post.title} - {post.author.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
