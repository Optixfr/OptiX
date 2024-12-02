import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateralNavbarComponent } from './lateral-navbar.component';

describe('LateralNavbarComponent', () => {
  let component: LateralNavbarComponent;
  let fixture: ComponentFixture<LateralNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LateralNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LateralNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
