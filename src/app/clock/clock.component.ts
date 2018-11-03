import { ClockGeneratorService } from './clock-generator.service';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { WindowRef } from './window-ref.service';
import { Subject, BehaviorSubject, interval, Observable } from 'rxjs';
import { delay, share, map } from 'rxjs/operators';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas', {read: ElementRef}) canvas: ElementRef;
  ctx: CanvasRenderingContext2D;

  time: string;
  startSeconds: number;
  interval: any;

  constructor(private clock: ClockGeneratorService) { }

  ngOnInit() {
    const hours = 0;
    const minutes = 0;
    const seconds = 14;

    this.startSeconds = hours * 3600 + minutes * 60 + seconds;
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }


  start() {
    const h = 0;
    const m = 0;
    const s = 15;

    this.clock.clock$.subscribe(element => this.time = this.clock.show(element));
    this.clock.init(this.ctx);
    this.clock.start(h, m, s);
  }
}
