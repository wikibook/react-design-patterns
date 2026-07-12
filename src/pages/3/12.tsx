import { cloneElement } from 'react';
import { cn } from 'tailwind-variants';

interface ButtonProps {
  children: React.ReactElement<{
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
  }>;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export function Button({ children, onClick, className }: ButtonProps) {
  const childClassName = children.props.className ?? '';

  return cloneElement(children, {
    className: cn(
      'px-4 py-2 rounded bg-blue-500 text-white',
      className,
      childClassName,
    ),
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      if (!e.defaultPrevented) {
        onClick?.(e);
      }
    },
  });
}
