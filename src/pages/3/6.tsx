type ForProps<T extends Array<unknown>> = {
  each: T | null | undefined; // 배열 또는 null/undefined 허용
  children: (item: T[number], index: number) => React.ReactNode;
  fallback?: React.ReactNode;
};

export function For<T extends Array<unknown>>({
  each,
  children,
  fallback = null,
}: ForProps<T>) {
  return each && each.length > 0 ? each.map(children) : fallback;
}
