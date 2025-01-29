import { TestBed } from '@angular/core/testing';

import { EyesCalculationService } from './eyes-calculation.service';

describe('EyesCalculationService', () => {
  let service: EyesCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EyesCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
