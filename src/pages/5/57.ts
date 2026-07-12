export type Props =
  | {
      type: 'button';
      label: string;
      onClick: () => void;
    }
  | {
      type: 'link';
      href: string;
      target?: string;
    };
