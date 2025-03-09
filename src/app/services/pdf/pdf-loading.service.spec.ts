import { TestBed } from '@angular/core/testing';

import { PdfLoadingService } from '../../src/app/services/pdf/pdf-loading.service';

describe('PdfLoadingService', () => {
  let service: PdfLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
