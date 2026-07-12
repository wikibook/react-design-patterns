export type Comment = {
  id: string;
  author: string;
  content: string;
  replies?: Array<Comment>;
};
