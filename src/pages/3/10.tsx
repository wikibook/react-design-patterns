import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

import { Show } from './2';

type WrapRenderer = (children: ReactNode) => ReactNode;

interface OptionalWrapperProps {
  when: boolean;
  children: ReactNode;
}

interface WrapperProps {
  children: WrapRenderer;
}

interface CoreProps {
  children: ReactNode;
}

interface OptionalWrapperSettingContextValue {
  setWrapper: Dispatch<SetStateAction<WrapRenderer | null>>;
  setFallback: Dispatch<SetStateAction<WrapRenderer | null>>;
  setCore: Dispatch<SetStateAction<ReactNode>>;
}

const OptionalWrapperSettingContext =
  createContext<OptionalWrapperSettingContextValue | null>(null);

const identity: WrapRenderer = (content) => content;

function useOptionalWrapperSetting() {
  const context = useContext(OptionalWrapperSettingContext);
  if (!context) {
    throw new Error(
      'OptionalWrapper 설정 컴포넌트는 OptionalWrapper 내부에서만 사용할 수 있습니다.',
    );
  }
  return context;
}

function OptionalWrapper({ when, children }: OptionalWrapperProps): ReactNode {
  const [wrapper, setWrapper] = useState<WrapRenderer | null>(null);
  const [fallback, setFallback] = useState<WrapRenderer | null>(null);
  const [core, setCore] = useState<ReactNode>(null);

  const contextValue = useMemo(
    () => ({ setWrapper, setFallback, setCore }),
    [setWrapper, setFallback, setCore],
  );

  const resolvedWrapper = wrapper ?? identity;
  const resolvedFallback = fallback ?? identity;

  return (
    <OptionalWrapperSettingContext.Provider value={contextValue}>
      {children}
      <Show when={when} fallback={resolvedFallback(core)}>
        {resolvedWrapper(core)}
      </Show>
    </OptionalWrapperSettingContext.Provider>
  );
}

OptionalWrapper.Wrapper = function Wrapper({ children }: WrapperProps) {
  const { setWrapper } = useOptionalWrapperSetting();

  useLayoutEffect(() => {
    setWrapper(() => children);
    return () => setWrapper(null);
  }, [children, setWrapper]);

  return null;
};

OptionalWrapper.Fallback = function Fallback({ children }: WrapperProps) {
  const { setFallback } = useOptionalWrapperSetting();

  useLayoutEffect(() => {
    setFallback(() => children);
    return () => setFallback(null);
  }, [children, setFallback]);

  return null;
};

OptionalWrapper.Core = function Core({ children }: CoreProps) {
  const { setCore } = useOptionalWrapperSetting();

  useLayoutEffect(() => {
    setCore(children);
    return () => setCore(null);
  }, [children, setCore]);

  return null;
};

type Post = {
  id: number;
  title: string;
  content: string;
};

function PostCard({ post, linkHref }: { post: Post; linkHref?: string }) {
  return (
    <OptionalWrapper when={Boolean(linkHref)}>
      <OptionalWrapper.Wrapper>
        {(children) => <a href={linkHref}>{children}</a>}
      </OptionalWrapper.Wrapper>

      <OptionalWrapper.Fallback>
        {(children) => <span>{children}</span>}
      </OptionalWrapper.Fallback>

      <OptionalWrapper.Core>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </OptionalWrapper.Core>
    </OptionalWrapper>
  );
}

export default function Page() {
  return (
    <PostCard
      post={{ id: 1, title: 'Post Title', content: 'Post Content' }}
      // linkHref="/post/1" 주석을 해제하면 제목과 내용이 링크로 감싸집니다.
    />
  );
}
