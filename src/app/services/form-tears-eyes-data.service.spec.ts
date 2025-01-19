import { TestBed } from '@angular/core/testing';

import { FormTearsEyesDataService } from './form-tears-eyes-data.service';

describe('FormTearsEyesDataService', () => {
  let service: FormTearsEyesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormTearsEyesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
