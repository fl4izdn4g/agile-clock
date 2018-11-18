import { Injectable,  ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { element } from '@angular/core/src/render3';

@Injectable({
  providedIn:  'root'
})
export class ArcGeneratorService {

  path: any;
  arc: any;
  pie: any;
  _current: any;

  constructor() { }

  generate(context:  ElementRef, start) {
    const data = [start, 0];
    const color = d3.scaleOrdinal(['#e53939', '#dddddd']);

    const width = 600;
    const height = 600;
    const thickness = 40;
    const radius = Math.min(width, height) / 2;

    d3.select(context.nativeElement).selectAll('*').remove();

    const svg = d3.select(context.nativeElement)
    .append('svg')
    .attr('class', 'pie')
    .attr('width', width)
    .attr('height', height);

    const g = svg.append('g')
    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    this.arc = d3.arc()
    .innerRadius(radius - thickness)
    .outerRadius(radius);

    this.pie = d3.pie().sort(null);

    const _that = this;

    this.path = g.selectAll('path')
    .data(this.pie(data))
    .enter()
    .append('g')
      .append('path')
      .attr('d', this.arc)
      .attr('fill', (d, i) => color(i.toString()))
      .each(function(d) { _that._current = d; });
  }

  change(wasLeft, is) {
    this.path = this.path.data(this.pie([wasLeft, is]));
    this.path.attr('d', this.arc);
  }
}
