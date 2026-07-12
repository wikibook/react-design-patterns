import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchAuthorPosts,
  fetchUser,
  updateUserName,
  userId,
  type AuthorPost,
  type User,
} from './mock';

function useUpdateUserName() {
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

      await queryClient.cancelQueries({ queryKey: ['posts-with-author'] });
      const previousPosts = queryClient.getQueryData<Array<AuthorPost>>([
        'posts-with-author',
      ]);

      queryClient.setQueryData<Array<AuthorPost>>(['posts-with-author'], (old) => {
        if (!old) return old;
        return old.map((post) =>
          post.author.id === userId
            ? { ...post, author: { ...post.author, name } }
            : post,
        );
      });

      return { previousUser, previousPosts };
    },

    onError: (_error, { userId }, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(['user', userId], context.previousUser);
      }
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts-with-author'], context.previousPosts);
      }
    },

    onSettled: (_data, _error, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      queryClient.invalidateQueries({ queryKey: ['posts-with-author'] });
    },
  });
}

export default function MultiQueryOptimisticExample() {
  const { data: user } = useQuery({ queryKey: ['user', userId], queryFn: fetchUser });
  const { data: posts } = useQuery({
    queryKey: ['posts-with-author'],
    queryFn: fetchAuthorPosts,
  });
  const updateUserNameMutation = useUpdateUserName();

  return (
    <div>
      <h1>다중 쿼리 낙관적 업데이트</h1>
      <p>사용자 이름: {user?.name}</p>
      <button
        type="button"
        onClick={() =>
          updateUserNameMutation.mutate({ userId, name: `홍길동 ${Date.now() % 100}` })
        }
      >
        사용자 이름 변경
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
