import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

// 댓글 타입 정의
type Comment = {
  id: string;
  author: string;
  content: string;
  replies?: Array<Comment>;
  type?: 'normal' | 'system';
};

// 댓글 상태 Context 정의
interface CommentStateCtx {
  isOpen(id: string): boolean;
  toggle(id: string): void;
}

const CommentCtx = createContext<CommentStateCtx | null>(null);
const useCommentCtx = () => {
  const ctx = useContext(CommentCtx);
  if (!ctx) throw new Error('CommentCtx missing');
  return ctx;
};

// Node Props 타입
interface NodeProps {
  comment: Comment;
  depth?: number;
}

// 리듀서(Reducer) 정의
type Action =
  | { type: 'TOGGLE'; id: string }
  | { type: 'OPEN'; id: string }
  | { type: 'CLOSE'; id: string };

function reducer(
  state: Record<string, boolean>,
  action: Action,
): Record<string, boolean> {
  switch (action.type) {
    case 'TOGGLE':
      return { ...state, [action.id]: !state[action.id] };
    case 'OPEN':
      return { ...state, [action.id]: true };
    case 'CLOSE':
      return { ...state, [action.id]: false };
    default:
      return state;
  }
}

// CommentTree: 루트 + Node 재귀 구조
export const CommentTree = Object.assign(
  function Root({ data }: { data: Comment }) {
    const [state, dispatch] = useReducer(reducer, {});

    const isOpen = useCallback((id: string) => state[id] ?? true, [state]);
    const toggle = useCallback(
      (id: string) => dispatch({ type: 'TOGGLE', id }),
      [],
    );

    const ctx = useMemo(() => ({ isOpen, toggle }), [isOpen, toggle]);

    return (
      <CommentCtx.Provider value={ctx}>
        <CommentTree.Node comment={data} />
      </CommentCtx.Provider>
    );
  },
  {
    Node: React.memo(function Node({ comment, depth = 0 }: NodeProps) {
      const { isOpen, toggle } = useCommentCtx();
      const opened = isOpen(comment.id);
      const hasChildren = comment.replies?.length;

      return (
        <section style={{ marginLeft: depth * 12 }}>
          <header
            style={{ cursor: hasChildren ? 'pointer' : 'default' }}
            onClick={() => hasChildren && toggle(comment.id)}
          >
            <strong>{comment.author}</strong>: {comment.content}{' '}
            {hasChildren && (opened ? '[-]' : '[+]')}
          </header>

          {hasChildren && opened && (
            <ul style={{ listStyle: 'none', paddingLeft: 4 }}>
              {comment.replies?.map((c) => (
                <li key={c.id}>
                  <CommentTree.Node comment={c} depth={depth + 1} />
                </li>
              ))}
            </ul>
          )}
        </section>
      );
    }),
  },
);
