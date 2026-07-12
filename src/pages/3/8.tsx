import { Show } from './2';

export interface OptionalWrapperProps<T> {
  when: T;
  children: React.ReactNode;
  wrapper: (children: React.ReactNode) => React.ReactNode;
  fallback?: (children: React.ReactNode) => React.ReactNode;
}

export function OptionalWrapper<T>({
  when,
  children,
  wrapper,
  fallback,
}: OptionalWrapperProps<T>): React.ReactNode {
  return (
    <Show when={when} fallback={fallback ? fallback(children) : children}>
      {wrapper(children)}
    </Show>
  );
}
