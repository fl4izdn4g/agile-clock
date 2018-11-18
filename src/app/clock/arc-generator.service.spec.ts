import { TestBed } from '@angular/core/testing';

import { ArcGeneratorService } from './arc-generator.service';

describe('ArcGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArcGeneratorService = TestBed.get(ArcGeneratorService);
    expect(service).toBeTruthy();
  });
});
