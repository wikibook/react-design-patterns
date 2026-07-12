import { ImageProps } from './19';

export type ImagePropsWithoutSrc = Omit<ImageProps, 'src'>;
//          ~~~~~~~~~~~~~~~~~~~~ { alt: string; }
