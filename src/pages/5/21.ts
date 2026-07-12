import { ImageProps } from './19';

export type OmitDiscriminatedUnion<T, K extends keyof T> = T extends unknown
  ? Omit<T, K>
  : never;

export type ImagePropsWithoutSrc = OmitDiscriminatedUnion<ImageProps, 'src'>;
//   ~~~~~~~~~~~~~~~~~~~~ {
//                          alt: string;
//                          size: `${number}x${number}`;
//                        } | {
//                          alt: string;
//                          width: number | `${number}`;
//                          height: number | `${number}`;
//                        }
