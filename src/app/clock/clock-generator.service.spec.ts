import { TestBed } from '@angular/core/testing';

import { ClockGeneratorService } from './clock-generator.service';

describe('ClockGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    jasmine.clock().uninstall();
    jasmine.clock().install();
  });

  afterEach(() => jasmine.clock().uninstall());

  it('should be created', () => {
    const service: ClockGeneratorService = TestBed.get(ClockGeneratorService);
    expect(service).toBeTruthy();
  });

  it('should decrement timer after calling #start()', () => {
    const service: ClockGeneratorService = TestBed.get(ClockGeneratorService);
    const contextSpy = jasmine.createSpyObj('CanvasRenderingContext2D', ['stroke', 'arc', 'beginPath' ]);

    let time = 0;
    service.clock$.subscribe(element => {
      time = element;
    });
    service.init(contextSpy);
    service.start(0, 0, 4);
    jasmine.clock().tick(1001);

    expect(time).toEqual(3);

  });

  it('should draw arc after calling #start()', () => {
    const service: ClockGeneratorService = TestBed.get(ClockGeneratorService);
    const contextSpy = jasmine.createSpyObj('CanvasRenderingContext2D', ['stroke', 'arc', 'beginPath' ]);

    let time = 0;
    service.clock$.subscribe(element => {
      time = element;
    });
    service.init(contextSpy);
    service.start(0, 0, 1);
    jasmine.clock().tick(1001);

    expect(contextSpy.stroke).toHaveBeenCalledTimes(2);
  });

  it('should clearInterval after calling #start()', () => {
    spyOn(window, 'clearInterval');
    const service: ClockGeneratorService = TestBed.get(ClockGeneratorService);
    const contextSpy = jasmine.createSpyObj('CanvasRenderingContext2D', ['stroke', 'arc', 'beginPath', ]);

    service.init(contextSpy);
    service.start(0, 0, 1);

    jasmine.clock().tick(1001);
    expect(window.clearInterval).toHaveBeenCalled();
  });

  it('should return time in [00:00:00] format after calling #show()', () => {
    const service: ClockGeneratorService = TestBed.get(ClockGeneratorService);
    expect(service.show(125)).toMatch('00:02:05');
  });

  it('should end timer with 0 after 15s from calling #start()', () => {
    const service: ClockGeneratorService = TestBed.get(ClockGeneratorService);
    const contextSpy = jasmine.createSpyObj('CanvasRenderingContext2D', ['stroke', 'arc', 'beginPath', ]);

    let time = 0;
    service.clock$.subscribe(element => {
      time = element;
    });
    service.init(contextSpy);
    service.start(0, 0, 15);
    jasmine.clock().tick(15001);

    expect(0).toEqual(0);

  });

  it('should end timer after calling #stop()', () => {
    const service: ClockGeneratorService = TestBed.get(ClockGeneratorService);
    spyOn(window, 'clearInterval');
    let time = 0;
    service.clock$.subscribe(element => {
      time = element;
    });
    service.stop();

    expect(time).toEqual(0);
    expect(window.clearInterval).toHaveBeenCalledTimes(1);
  });

  it('should reset timer when #start() called second time after few seconds', () => {
    const service: ClockGeneratorService = TestBed.get(ClockGeneratorService);
    const contextSpy = jasmine.createSpyObj('CanvasRenderingContext2D', ['stroke', 'arc', 'beginPath', ]);

    let time = 0;
    service.clock$.subscribe(element => {
      time = element;
    });
    service.init(contextSpy);
    service.start(0, 0, 15);
    jasmine.clock().tick(13001);

    service.start(0, 0, 20);
    jasmine.clock().tick(1001);

    expect(time).toEqual(19);

  });

  it('should pause timer when #pause() is called', () => {
    fail();
  });

  it('should continue when calling #start() after #pause() was called', () => {
    fail();
  });
});
