import { OptionalWrapper } from './8';

type Post = {
  id: number;
  title: string;
  content: string;
};

export function PostCard({ post, withLink }: { post: Post; withLink?: string }) {
  return (
    <OptionalWrapper
      when={withLink}
      wrapper={(children) => <a href={`/posts/${post.id}`}>{children}</a>}
    >
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </OptionalWrapper>
  );
}
