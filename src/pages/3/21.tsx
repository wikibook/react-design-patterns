import { forwardRef, type Ref } from 'react';
import { cn } from 'tailwind-variants';
import { Slot } from './19';

type AnchorProps = {
  asChild?: boolean;
} & React.ComponentPropsWithoutRef<'a'>;

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  function Anchor({ asChild, className, ...props }, ref) {
    const classes = cn('bg-blue-500 text-white px-4 py-2 rounded', className);

    if (asChild) {
      return (
        <Slot ref={ref as Ref<HTMLElement>} {...props} className={classes} />
      );
    }

    return <a ref={ref} {...props} className={classes} />;
  },
);
