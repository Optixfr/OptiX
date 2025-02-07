import { TestBed } from '@angular/core/testing';

import { FormSizeEyesDataService } from './form-size-eyes-data.service';

describe('FormSizeEyesDataService', () => {
  let service: FormSizeEyesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormSizeEyesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
