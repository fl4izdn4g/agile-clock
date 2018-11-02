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

  // @ViewChild('canvas', {read: ElementRef}) canvas: ElementRef;
  // ctx: CanvasRenderingContext2D;
  // c: HTMLCanvasElement;

  time: string;
  startSeconds: number;
  interval: any;

  constructor(private windowRef: WindowRef) { }

  ngOnInit() {
    const hours = 0;
    const minutes = 0;
    const seconds = 14;

    this.startSeconds = hours * 3600 + minutes * 60 + seconds;
  }

  ngAfterViewInit(): void {
    // this.c = <HTMLCanvasElement>this.canvas.nativeElement;
    // this.ctx = this.c.getContext('2d');
    // this.c.width = document.documentElement.clientWidth - 35;
    // this.c.height = document.documentElement.clientHeight - 45;
    // //this.draw(new Date());
    // //this.windowRef.nativeWindow.requestAnimationFrame(this.draw);
  }


  start() {
    let t = this.startSeconds;
    this.time = this.convert(t);
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      t--;
      if (t) {
        this.time = this.convert(t);
      } else {
        this.time = '00:00:00';
        clearInterval(this.interval);
      }
    }, 1000);
  }

  convert(seconds): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds - h * 3600) / 60);
    const s = Math.floor(seconds - h * 3600 - m * 60);

    return h.toString().padStart(2, '0') + ':' + m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');
  }

  // private draw(now)
  // {
  //   var min, sec, hr, ms, amOrPm = 'AM';
  //   var radH, radM, radS;
  //   const threePIByTwo = (3 * Math.PI) / 2;

  //   var centerX = this.c.width / 2,
  //       centerY = this.c.height / 2,
  //       date = new Date();

  //   sec = date.getSeconds();
  //   ms = date.getMilliseconds();

  //   radS = 0.006 * ( ( sec * 1000 ) + ms );

  //   this.drawCircle(centerX, centerY, 220, 0, Math.PI * 2, false, '#eeeeee', 'stroke', 50); //secondgrey
  //   this.drawCircle(centerX, centerY, 220, threePIByTwo, this.rad(radS) + threePIByTwo, false, '#DC543E', 'stroke', 50); //second
  //   this.windowRef.nativeWindow.requestAnimationFrame(this.draw);
  // }

  // private rad(deg){
  //   return  (Math.PI / 180) * deg;
  // }

  // private drawText(text, x, y, color, size) {
  //   this.ctx.font = `${size} "Passion One"`;
  //   this.ctx.fillStyle = color;
  //   this.ctx.fillText(text, x, y);
  // }

  // private drawRect(x, y, width, height, color) {
  //   this.ctx.fillStyle = color;
  //   this.ctx.fillRect(x, y, width, height);
  // }

  // private drawArc(x, y, radius, start, end, clockwise)
  // {
  //   this.ctx.beginPath();
  //   this.ctx.arc(x, y, radius, start, end, clockwise);
  // }

  // private drawCircle(x, y, radius, start, end, clockwise, color, type, thickness) {
  //   if(type == 'fill')
  //   {
  //     this.ctx.fillStyle = color;
  //     this.drawArc(x, y, radius, start, end, clockwise)
  //     this.ctx.fill();
  //   }
  //   else if(type == 'stroke')
  //   {
  //     this.ctx.strokeStyle = color;
  //     this.ctx.lineWidth = thickness;
  //     this.drawArc(x, y, radius, start, end, clockwise)
  //     this.ctx.stroke();
  //   }
  // }








}
