import { TestBed } from '@angular/core/testing';

import { ClockArcGeneratorService, ArcOptions } from './clock-arc-generator.service';

describe('ArcGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClockArcGeneratorService = TestBed.get(ClockArcGeneratorService);
    expect(service).toBeTruthy();
  });

  it('should calculate proper radian given total seconds and current second', () => {
    const service = TestBed.get(ClockArcGeneratorService);

    let result = service.toRadian(60, 60);
    expect(result).toEqual(2 * Math.PI);

    result = service.toRadian(60, 15);
    expect(result).toBeCloseTo(0.5 * Math.PI);
  });

  it('should draw arc given totalSeconds, currentSeconds and drawing options', () => {
    const service: ClockArcGeneratorService = TestBed.get(ClockArcGeneratorService);

    const contextSpy: any = jasmine.createSpyObj(
      'CanvasRenderingContext2D',
      ['beginPath', 'stroke', 'arc', 'lineWidth', 'strokeStyle']
    );

    const options: ArcOptions = {
      x: 10,
      y: 10,
      radius: 50,
      stroke: {
        background: '#dddddd',
        color: '#ff0000'
      },
      lineWidth: 15
    };

    const startRadian = 1.5 * Math.PI;

    service.init(contextSpy);
    service.drawArc(1000, 10, options);

    expect(contextSpy.beginPath).toHaveBeenCalledTimes(2);
    expect(contextSpy.stroke).toHaveBeenCalledTimes(2);
    expect(contextSpy.arc).toHaveBeenCalledWith(options.x, options.y, options.radius, 0, 2 * Math.PI);
    expect(contextSpy.arc).toHaveBeenCalledWith(
      options.x, options.y,
      options.radius,
      startRadian, startRadian - service.toRadian(1000, 10)
    );
  });

  it('should throw exception when canvas is not available', () => {
    const service: ClockArcGeneratorService = TestBed.get(ClockArcGeneratorService);

    const options: ArcOptions = {
      x: 0,
      y: 0,
      radius: 50,
      stroke: {
        background: '#000000',
        color: '#ff0000'
      },
      lineWidth: 15
    };

    expect(() => service.drawArc(1000, 13, options)).toThrowError();
  });

  it('should throw exception when required drawing options are empty', () => {
    const service: ClockArcGeneratorService = TestBed.get(ClockArcGeneratorService);
    const contextSpy = jasmine.createSpyObj('CanvasRenderingContext2D', ['arc']);

    expect(() => {
      service.init(contextSpy);
      service.drawArc(1000, 13, null);
    }).toThrowError();
  });

});
