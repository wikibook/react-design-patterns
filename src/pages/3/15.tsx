import { forwardRef, isValidElement, type ReactElement } from 'react';
import { cn } from 'tailwind-variants';
import { Slot } from './14';

type ButtonProps = {
  asChild?: boolean;
} & React.ComponentPropsWithoutRef<'button'>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ asChild, children, className, ...props }, ref) {
    const classes = cn('bg-blue-500 text-white px-4 py-2 rounded', className);

    if (asChild) {
      if (!isValidElement(children)) {
        return null;
      }

      const child = children as ReactElement<Record<string, unknown>>;

      return (
        <Slot ref={ref} {...props} className={classes}>
          {child}
        </Slot>
      );
    }

    return (
      <button ref={ref} {...props} className={classes}>
        {children}
      </button>
    );
  },
);
