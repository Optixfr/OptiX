import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTearsEyesComponent } from './form-tears-eyes.component';

describe('FormTearsEyesComponent', () => {
  let component: FormTearsEyesComponent;
  let fixture: ComponentFixture<FormTearsEyesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTearsEyesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTearsEyesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
