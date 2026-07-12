export type ImageProps =
  | {
      src: string;
      alt: string;
      size: `${number}x${number}`;
    }
  | {
      src: string;
      alt: string;
      width: number | `${number}`;
      height: number | `${number}`;
    };
