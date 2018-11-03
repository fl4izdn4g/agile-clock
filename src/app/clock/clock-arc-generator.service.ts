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

  private initialized = false;
  private context: CanvasRenderingContext2D;

  constructor() { }

  public init(context: CanvasRenderingContext2D) {
    this.context = context;
    this.initialized = true;
  }

  toRadian(totalSeconds: number, currentSecond: number): number {
    const oneSecond = (2 / totalSeconds) * Math.PI;
    return currentSecond * oneSecond;
  }

  drawArc(totalSeconds: number, currentSeconds: number, options: ArcOptions) {
    if (!this.initialized) {
      throw new Error('Context not initialized');
    }

    if (!options) {
      throw new Error('Options uninitialized');
    }

    this.context.beginPath();
    this.context.arc(
      options.x,
      options.y,
      options.radius,
      0,
      2 * Math.PI
    );
    this.context.strokeStyle = options.stroke.background;
    this.context.lineWidth = options.lineWidth;
    this.context.stroke();

    this.context.beginPath();
    this.context.arc(
      options.x,
      options.y,
      options.radius,
      this.startRadian, this.startRadian - this.toRadian(totalSeconds, currentSeconds)
    );
    this.context.strokeStyle = options.stroke.color;
    this.context.lineWidth = options.lineWidth;
    this.context.stroke();
  }

}
