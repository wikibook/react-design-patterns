import { createElement, type SVGProps } from 'react';
import eyeSlashSrc from './eye-slash.svg';
import eyeSrc from './eye.svg';

export function eye(props: SVGProps<SVGSVGElement>) {
  return createElement(
    'svg',
    props,
    createElement('image', { href: eyeSrc, width: '100%', height: '100%' }),
  );
}

export function eyeSlash(props: SVGProps<SVGSVGElement>) {
  return createElement(
    'svg',
    props,
    createElement('image', { href: eyeSlashSrc, width: '100%', height: '100%' }),
  );
}

export { eyeSlash as 'eye-slash' };
