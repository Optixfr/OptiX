import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSizeEyesPageComponent } from './form-size-eyes-page.component';

describe('FormSizeEyesPageComponent', () => {
  let component: FormSizeEyesPageComponent;
  let fixture: ComponentFixture<FormSizeEyesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSizeEyesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSizeEyesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
