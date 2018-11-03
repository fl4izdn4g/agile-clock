import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClockGeneratorService {

  private startingSeconds: number;
  private interval: any;

  private _clock$ = new Subject<number>();
  get clock$(): Subject<number> {
    return this._clock$;
  }

  constructor() { }

  start(hours: number, minutes: number, seconds: number) {
    this.startingSeconds = hours * 3600 + minutes * 60 + seconds;
    let time = this.startingSeconds;
    this._clock$.next(time);
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      time = this.decreaseTime(time);
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
      console.log(time);
      this._clock$.next(time);
    } else {
      this._clock$.next(0);
      clearInterval(this.interval);
    }

    return time;
  }
}
