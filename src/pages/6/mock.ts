export interface Post {
  id: string;
  title: string;
  isLiked: boolean;
  likeCount: number;
}

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthorPost {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
  };
}

export interface VersionedPost {
  id: string;
  title: string;
  version: number;
}

export interface UpdatePostParams {
  postId: string;
  title: string;
  version: number;
}

export const postId = 'post-1';
export const userId = 'user-1';

const posts: Array<Post> = [
  { id: 'post-1', title: 'Optimistic UI 소개', isLiked: false, likeCount: 3 },
  { id: 'post-2', title: '캐시 롤백 전략', isLiked: true, likeCount: 8 },
];

const comments: Array<Comment> = [
  { id: 'comment-1', text: '즉시 반응해서 좋네요.', createdAt: '2026-05-24' },
];

const user: User = {
  id: userId,
  name: '홍길동',
  email: 'hong@example.com',
};

const authorPosts: Array<AuthorPost> = [
  { id: 'post-1', title: '비정규화된 게시글', author: { id: userId, name: user.name } },
  { id: 'post-2', title: '다른 작성자의 게시글', author: { id: 'user-2', name: '김영희' } },
];

let versionedPost: VersionedPost = {
  id: postId,
  title: '버전 기반 게시글',
  version: 1,
};

function delay(ms = 400): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export async function fetchPost(id: string): Promise<Post> {
  await delay();
  return posts.find((post) => post.id === id) ?? posts[0];
}

export async function fetchPosts(): Promise<Array<Post>> {
  await delay();
  return posts;
}

export async function fetchComments(): Promise<Array<Comment>> {
  await delay();
  return comments;
}

export async function fetchUser(): Promise<User> {
  await delay();
  return user;
}

export async function fetchAuthorPosts(): Promise<Array<AuthorPost>> {
  await delay();
  return authorPosts;
}

export async function fetchVersionedPost(): Promise<VersionedPost> {
  await delay();
  return versionedPost;
}

export async function toggleLike(id: string): Promise<Post> {
  await delay();
  const post = posts.find((item) => item.id === id) ?? posts[0];
  post.isLiked = !post.isLiked;
  post.likeCount += post.isLiked ? 1 : -1;
  return post;
}

export async function deletePost(id: string): Promise<void> {
  await delay();
  console.log(`${id} 삭제 요청 완료`);
}

export async function createComment(text: string): Promise<Comment> {
  await delay();
  return {
    id: `comment-${Date.now()}`,
    text,
    createdAt: new Date().toISOString(),
  };
}

export async function updateUserName(name: string): Promise<User> {
  await delay();
  user.name = name;
  return { ...user };
}

export async function updatePost({
  postId: id,
  title,
  version,
}: UpdatePostParams): Promise<VersionedPost> {
  await delay();

  if (version !== versionedPost.version) {
    throw { code: 'VERSION_CONFLICT' };
  }

  versionedPost = { id, title, version: version + 1 };
  return versionedPost;
}
