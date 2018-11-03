import { Injectable } from '@angular/core';

export interface ArcOptions {
  x: number;
  y: number;
  radius: number;
  stroke: {
    background: string;
    color: string;
  };
  lineWidth: number;
}

// https://jsfiddle.net/tnzgb6sj/

@Injectable({
  providedIn: 'root'
})
export class ClockArcGeneratorService {
  private get startRadian() {
    return  1.5 * Math.PI;
  }

  constructor() { }

  toRadian(totalSeconds: number, currentSecond: number): number {
    const oneSecond = (2 / totalSeconds) * Math.PI;
    return currentSecond * oneSecond;
  }

  drawArc(context: CanvasRenderingContext2D, totalSeconds: number, currentSeconds: number, options: ArcOptions) {
    if (!context) {
      throw new Error('Canvas Context does not exist');
    }
    if (!options) {
      throw new Error('Options uninitialized');
    }

    context.beginPath();
    context.arc(
      options.x,
      options.y,
      options.radius,
      0,
      2 * Math.PI
    );
    context.strokeStyle = options.stroke.background;
    context.lineWidth = options.lineWidth;
    context.stroke();

    context.beginPath();
    context.arc(
      options.x,
      options.y,
      options.radius,
      this.startRadian, this.startRadian - this.toRadian(totalSeconds, currentSeconds)
    );
    context.strokeStyle = options.stroke.color;
    context.lineWidth = options.lineWidth;
    context.stroke();
  }

}
