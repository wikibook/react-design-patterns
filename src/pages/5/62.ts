import { Drawable, Shape } from './60';
import { Circle, Square } from './61';

type ShapeConstructorMap = {
  circle: new (radius: number) => Drawable;
  square: new (size: number) => Drawable;
};

export class ShapeFactory {
  private static shapeMap: ShapeConstructorMap = {
    circle: Circle,
    square: Square,
  };

  create(shape: Shape): Drawable {
    const ShapeClass = ShapeFactory.shapeMap[shape.type];

    switch (shape.type) {
      case 'circle':
        return new ShapeClass(shape.radius);

      case 'square':
        return new ShapeClass(shape.size);

      default:
        throw new Error('Unknown shape type');
    }
  }
}
