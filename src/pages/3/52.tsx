import { Comment } from "./49";

export function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div style={{ marginLeft: 12 }}>
      <p>
        <strong>{comment.author}</strong>: {comment.content}
      </p>
      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} />
      ))}
    </div>
  );
}
