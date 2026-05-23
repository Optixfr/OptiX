import { TestBed } from '@angular/core/testing';

import { PdfGenerationService } from './pdf-generation.service';

describe('PdfGenerationService', () => {
  let service: PdfGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
