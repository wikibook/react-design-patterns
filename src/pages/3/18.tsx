import { isValidElement, type ReactElement, type ReactNode } from 'react';

const SLOTTABLE_IDENTIFIER = Symbol('slot.slottable');

type SlottableProps = {
  children: ReactNode;
};

type SlottableType = ((props: SlottableProps) => ReactElement) & {
  __slotId: symbol;
};

function SlottableImpl({ children }: SlottableProps): ReactElement {
  return <>{children}</>;
}

export const Slottable = Object.assign(SlottableImpl, {
  __slotId: SLOTTABLE_IDENTIFIER,
}) as SlottableType;

export function isSlottable(
  child: ReactNode,
): child is ReactElement<SlottableProps, SlottableType> {
  return (
    isValidElement(child) &&
    typeof child.type === 'function' &&
    '__slotId' in child.type &&
    child.type.__slotId === SLOTTABLE_IDENTIFIER
  );
}
