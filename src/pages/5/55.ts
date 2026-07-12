export type Props =
  | { label: string; onClick: () => void }
  | { href: string; target?: string };
