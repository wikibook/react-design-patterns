import {
  ComponentPropsWithRef,
  createElement,
  forwardRef,
  JSX,
  type ForwardRefExoticComponent,
  type PropsWithoutRef,
  type ReactNode,
  type RefAttributes,
} from "react";

type ShowProps<T> = {
  when: T;
  children: ReactNode | ((value: NonNullable<T>) => ReactNode);
  fallback?: ReactNode;
};

type ShowType = {
  <T>(props: ShowProps<T>): ReactNode;
} & { [K in (typeof htmlTags)[number]]: ShowTagComponent<K> };

type ShowTagComponent<Tag extends keyof JSX.IntrinsicElements> =
  ForwardRefExoticComponent<
    PropsWithoutRef<
      ShowProps<unknown> &
        Omit<ComponentPropsWithRef<Tag>, keyof ShowProps<unknown>>
    > &
      RefAttributes<HTMLElement>
  >;

const htmlTags = [
  "div",
  "span",
  "p",
  "button",
  "section",
  "article",
  "header",
  "footer",
  "main",
] as const;

// 기본 조건부 렌더링 컴포넌트
const BaseShow = <T,>({ when, children, fallback = null }: ShowProps<T>) => {
  return when
    ? typeof children === "function"
      ? children(when)
      : children
    : fallback;
};

// 태그별 Show 컴포넌트를 생성하는 헬퍼
const renderForTag = <Tag extends keyof JSX.IntrinsicElements>(
  tag: Tag,
): ShowTagComponent<Tag> =>
  forwardRef<
    HTMLElement,
    ShowProps<unknown> &
      Omit<ComponentPropsWithRef<Tag>, keyof ShowProps<unknown>>
  >(function Render(props, ref) {
    const {
      when,
      children,
      fallback = null,
      ...restProps
    } = props as ShowProps<unknown> &
      Omit<ComponentPropsWithRef<Tag>, keyof ShowProps<unknown>>;

    const content = when
      ? typeof children === "function"
        ? children(when)
        : children
      : fallback;

    return createElement(tag, { ...restProps, ref }, content);
  });

// 모든 HTML 태그에 대해 Show 컴포넌트 생성
const tagEntries = htmlTags.reduce(
  (acc, tag) => {
    acc[tag] = renderForTag(tag as keyof JSX.IntrinsicElements);
    return acc;
  },
  {} as { [K in (typeof htmlTags)[number]]: ShowTagComponent<K> },
);

// BaseShow와 태그별 Show를 합쳐서 export
export const Show = Object.assign(BaseShow, tagEntries) as ShowType;

export default function ShowExample() {
  return (
    <div>
      <Show when={true} fallback={<div>False</div>}>
        <div>True</div>
      </Show>

      <Show.button type="button" when={false} fallback={<span>False</span>}>
        <span>True</span>
      </Show.button>

      <Show.p when={true}>
        {(value) => `The value is ${value ? "true" : "false"}`}
      </Show.p>
    </div>
  );
}
