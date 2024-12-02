import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTearsEyesPageComponent } from './form-tears-eyes-page.component';

describe('FormTearsEyesPageComponent', () => {
  let component: FormTearsEyesPageComponent;
  let fixture: ComponentFixture<FormTearsEyesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTearsEyesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTearsEyesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
