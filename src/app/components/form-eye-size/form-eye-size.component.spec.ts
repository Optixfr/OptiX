import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEyeSizeComponent } from './form-eye-size.component';

describe('FormEyeSizeComponent', () => {
  let component: FormEyeSizeComponent;
  let fixture: ComponentFixture<FormEyeSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEyeSizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEyeSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
