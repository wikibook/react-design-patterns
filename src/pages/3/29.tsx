import { ComponentPropsWithRef, createElement, JSX } from 'react';

type ShowProps<T> = {
  when: T;
  children: React.ReactNode | ((value: NonNullable<T>) => React.ReactNode);
  fallback?: React.ReactNode;
};

type AsTag = keyof JSX.IntrinsicElements;

type DynamicShowProps<T, Tag extends AsTag> = ShowProps<T> & {
  as: Tag;
} & Omit<ComponentPropsWithRef<Tag>, keyof ShowProps<T> | 'as'>;

type DynamicShowRef<Tag extends AsTag> = React.Ref<
  JSX.IntrinsicElements[Tag] extends React.DetailedHTMLProps<infer _, infer E>
    ? E
    : HTMLElement
>;

// DynamicShow 컴포넌트
export function DynamicShow<T extends unknown, Tag extends AsTag>({
  when,
  children,
  fallback = null,
  as,
  ref,
  ...props
}: DynamicShowProps<T, Tag> & { ref?: DynamicShowRef<Tag> }) {
  const content = when
    ? typeof children === 'function'
      ? children(when as NonNullable<T>)
      : children
    : fallback;

  return createElement(as, { ...props, ref }, content);
}
