import { Drawable } from './60';

export class Circle implements Drawable {
  constructor(private radius: number) {}

  draw() {
    console.log('draw circle', this.radius);
  }
}

export class Square implements Drawable {
  constructor(private size: number) {}

  draw() {
    console.log('draw square', this.size);
  }
}
