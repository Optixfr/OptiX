import { TestBed } from '@angular/core/testing';

import { ProgressBarServiceService } from './progress-bar-service.service';

describe('ProgressBarServiceService', () => {
  let service: ProgressBarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressBarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
