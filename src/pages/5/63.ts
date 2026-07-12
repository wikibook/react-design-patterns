// pnpm exec tsx src/pages/5/63.ts

import { ShapeFactory } from './62';

const shapeFactory = new ShapeFactory();

const drawable = shapeFactory.create({
  type: 'circle',
  radius: 10,
});

drawable.draw(); // draw circle 10
