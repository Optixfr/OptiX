import { TestBed } from '@angular/core/testing';

import { NavbarServiceService } from './navbar-service.service';

describe('NavbarServiceService', () => {
  let service: NavbarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
