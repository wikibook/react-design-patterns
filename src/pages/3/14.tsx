import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type Ref,
} from 'react';
import { composeRefs, mergeProps } from './13';

type SlotChildProps = Record<string, unknown>;

type SlotElement = ReactElement<SlotChildProps> & {
  ref?: Ref<HTMLElement>;
};

type SlotProps = {
  children: ReactElement<SlotChildProps>;
  ref?: Ref<HTMLElement>;
} & Record<string, unknown>;

export function Slot({ children, ref, ...slotProps }: SlotProps) {
  if (!isValidElement(children)) return null;

  const child = children as SlotElement;
  const childRef = child.ref;

  return cloneElement(child, {
    ...mergeProps(slotProps, child.props),
    ref: childRef ? composeRefs(ref, childRef) : ref,
  });
}
