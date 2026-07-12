import { ComponentPropsWithoutRef } from "react";
import styles from "../1/SignInput.module.css";

export function RoundBorderContainer({
  errorText,
  children,
  ...props
}: {
  errorText?: string;
} & ComponentPropsWithoutRef<"div">) {
  const borderControl = `${styles.input} ${errorText ? styles.errorBorder : ""}`;

  return (
    <div {...props} className={borderControl}>
      {children}
    </div>
  );
}

export function Label({
  children,
  ...props
}: ComponentPropsWithoutRef<"label">) {
  return (
    <label {...props} className={styles.label}>
      {children}
    </label>
  );
}

export function Input(props: ComponentPropsWithoutRef<"input">) {
  return <input {...props} className={styles.container} autoComplete="off" />;
}

export function ErrorNoticeText({ errorText }: { errorText?: string }) {
  if (!errorText) return null;
  return <div className={styles.errorMessage}>{errorText}</div>;
}

export function Button({
  children,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
}

import type { ComponentType, SVGProps } from "react";
import * as Icons from "./IconSVG";

type SvgIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type IconsName = keyof typeof Icons;

export const LocalIconComponentMap: Record<IconsName, SvgIconComponent> = Icons;

interface IconProps extends SVGProps<SVGSVGElement> {
  variant: IconsName;
  priority?: boolean;
}

export function Icon({
  variant,
  width = 24,
  height = 24,
  ...props
}: IconProps) {
  const SvgIcon = LocalIconComponentMap[variant];
  const ariaLabel = props["aria-label"];
  const ariaHidden = props["aria-hidden"];

  return (
    <SvgIcon
      width={width}
      height={height}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : (ariaLabel ?? variant)}
      {...props}
    />
  );
}

export * from "./usePasswordToggle";
