import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import { useId, useRef, useState } from 'react';
import { useComponentSize } from './useComponentSize';

export type Position = {
  mainAxis?: number;
  crossAxis?: number;
  placement?: Placement;
};
export type PopoverRole = 'listbox' | 'menu';

export function usePopoverPosition({
  position,
  role = 'listbox',
}: {
  position?: Position;
  role?: PopoverRole | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [anchorRef, size] = useComponentSize<HTMLElement>();
  const listRef = useRef<Array<HTMLElement>>([]);
  /* [a11y] Popover 고유 ID 생성 */
  const popoverId = useId();
  position = mergePosition(position ?? {});

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      setIsOpen(open);
      if (!open) setActiveIndex(null);
    },
    middleware: [
      offset({ mainAxis: position.mainAxis, crossAxis: position.crossAxis }),
      flip(),
      shift(),
    ],
    placement: position.placement,
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, {
    event: 'mousedown', // input의 경우 mousedown 이벤트 사용
  });
  // const hover = useHover(context);
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'mousedown',
    referencePress: false, // input 클릭 시 닫히지 않도록
  });

  const roleInteraction = useRole(context, {
    role: role ?? undefined,
    /* [a11y] 역할이 없을 때는 훅 비활성화 */
    enabled: !!role,
  });

  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    /* [a11y] Home/End 키 지원 */
    loop: true,
    enabled: !!role,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, roleInteraction, listNavigation].filter(
      Boolean,
    ) as Parameters<typeof useInteractions>[0],
  );

  const selectItem = (callback: () => void) => {
    callback();
    setIsOpen(false);
    setActiveIndex(null);
  };

  return {
    anchor: {
      ref: (node: HTMLElement | null) => {
        refs.setReference(node);
        anchorRef.current = node;
      },
      /* [a11y] aria-haspopup 메뉴 여부 표시 */
      ...(role && { 'aria-haspopup': role }),
      /* [a11y] aria-expanded 열림/닫힘 상태 */
      'aria-expanded': isOpen,
      /* [a11y] aria-controls 연결된 Popover ID */
      'aria-controls': isOpen ? popoverId : undefined,
      ...getReferenceProps(),
    },
    floater: {
      ref: refs.setFloating,
      /* [a11y] Popover 고유 ID */
      id: popoverId,
      style: floatingStyles,
      onKeyDown: (event: React.KeyboardEvent) => {
        /* [a11y] Tab 키로 항목 이동을 막고 앵커로 포커스 복귀 */
        if (role && event.key === 'Tab') {
          event.preventDefault();
          setIsOpen(false);
          setActiveIndex(null);
          anchorRef.current?.focus();
        }
      },
      ...getFloatingProps(),
    },
    helper: {
      isOpen,
      setIsOpen,
      getItemProps: role
        ? getItemProps
        : (userProps: Record<string, unknown> = {}) => userProps,
      activeIndex,
      selectItem,
      listRef,
      FloatingFocusManager,
      context,
      anchorWidth: size.width,
    },
  };
}

function mergePosition(position: Position = {}): NonNullable<Position> {
  const defaultPosition = {
    mainAxis: 0,
    crossAxis: 0,
    placement: 'bottom-start' as const,
  };

  return { ...defaultPosition, ...position };
}
