import { ClockGeneratorService } from './clock-generator.service';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Subject, BehaviorSubject, interval, Observable } from 'rxjs';
import { delay, share, map } from 'rxjs/operators';
import { ArcGeneratorService } from './arc-generator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faCogs, faPlay } from '@fortawesome/free-solid-svg-icons';
import { ValidTimeValidator } from './valid-time.validator';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  @ViewChild('clock')
  chartElement: ElementRef;

  time: string;
  setupVisible = false;

  iconCogs = faCogs;
  iconStart = faPlay;


  timeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clock: ClockGeneratorService,
    private arc: ArcGeneratorService) { }

  ngOnInit() {
    this.timeForm = this.fb.group({
      hours: ['00', [Validators.required, Validators.max(23), Validators.min(0)]],
      minutes: ['00', [Validators.required, Validators.max(59), Validators.min(0)]],
      seconds: ['10', [Validators.required, Validators.max(59), Validators.min(0)]]
    }, { validator: [ValidTimeValidator]});
  }

  onSubmit() {
    const h = this.timeForm.get('hours').value;
    const m = this.timeForm.get('minutes').value;
    const s = this.timeForm.get('seconds').value;
    this.start(h, m, s);
  }

  toggleSetup() {

    this.setupVisible = this.setupVisible ? false : true;
  }

  start(h: number, m: number, s: number) {

    const startingSeconds = h * 3600 + m * 60 + s;

    this.clock.clock$.subscribe(element => {
      this.time = this.clock.show(element);
      this.arc.change(startingSeconds - element, element);
    });

    this.arc.generate(this.chartElement, startingSeconds);
    this.clock.start(startingSeconds);
    this.toggleSetup();
  }


}
