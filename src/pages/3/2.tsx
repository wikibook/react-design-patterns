type ShowProps<T> = {
  when: T;
  children: React.ReactNode | ((value: NonNullable<T>) => React.ReactNode);
  fallback?: React.ReactNode;
};

export function Show<T>({ when, children, fallback = null }: ShowProps<T>) {
  return when
    ? typeof children === 'function'
      ? children(when)
      : children
    : fallback;
}
