import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Slot as PrimitiveSlot } from './14';
import { isSlottable } from './18';

type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
};

type SlotChildProps = Record<string, unknown> & {
  children?: ReactNode;
};

function isSlotChild(child: ReactNode): child is ReactElement<SlotChildProps> {
  return isValidElement<SlotChildProps>(child);
}

export const Slot = forwardRef<HTMLElement, SlotProps>(
  function Slot(props, ref) {
    const { children, ...slotProps } = props;
    const childrenArray = Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);

    if (slottable) {
      const newElement = slottable.props.children;

      if (!isSlotChild(newElement)) {
        return null;
      }

      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          return newElement.props.children;
        }

        return child;
      });

      return (
        <PrimitiveSlot {...slotProps} ref={ref}>
          {cloneElement(newElement, undefined, newChildren)}
        </PrimitiveSlot>
      );
    }

    if (!isSlotChild(children)) {
      return null;
    }

    return (
      <PrimitiveSlot {...slotProps} ref={ref}>
        {children}
      </PrimitiveSlot>
    );
  },
);

Slot.displayName = 'Slot';
