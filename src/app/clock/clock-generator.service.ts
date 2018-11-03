import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClockArcGeneratorService, ArcOptions } from './clock-arc-generator.service';

@Injectable({
  providedIn: 'root'
})
export class ClockGeneratorService {

  private startingSeconds: number;
  private interval: any;
  private context: CanvasRenderingContext2D;

  private _clock$ = new Subject<number>();
  get clock$(): Subject<number> {
    return this._clock$;
  }

  constructor(private arcGenerator: ClockArcGeneratorService) { }

  init(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  start(hours: number, minutes: number, seconds: number) {
    this.startingSeconds = hours * 3600 + minutes * 60 + seconds;

    this.arcGenerator.init(this.context);
    const options: ArcOptions = {
      x: 70,
      y: 70,
      radius: 50,
      stroke: {
        background: '#dddddd',
        color: '#ff0000'
      },
      lineWidth: 15
    };

    let time = this.startingSeconds;
    this._clock$.next(time);
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      time = this.decreaseTime(time);
      this.arcGenerator.drawArc(this.startingSeconds, time, options);
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
    this._clock$.next(0);
  }

  show(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds - h * 3600) / 60);
    const s = Math.floor(seconds - h * 3600 - m * 60);

    return h.toString().padStart(2, '0') + ':' + m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');
  }

  private decreaseTime(time) {
    time--;
    if (time) {
      this._clock$.next(time);
    } else {
      this._clock$.next(0);
      clearInterval(this.interval);
    }

    return time;
  }
}
