import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormSizeEyesPageComponent } from './form-size-eyes-page.component';
import { EyesMeasureStore } from '../../state/eyes-measure.store';
import { signal } from '@angular/core';

describe('FormSizeEyesPageComponent', () => {
  let component: FormSizeEyesPageComponent;
  let fixture: ComponentFixture<FormSizeEyesPageComponent>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      droite: signal({ sphere: '0' }),
      gauche: signal({ sphere: '0' }),
      isDuplicated: signal(false),
      updateRightEye: vi.fn(),
      updateLeftEye: vi.fn(),
      duplicateRightForm: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [FormSizeEyesPageComponent],
    })
      .overrideProvider(EyesMeasureStore, { useValue: mockStore })
      .compileComponents();

    fixture = TestBed.createComponent(FormSizeEyesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render right eye form', () => {
    const rightForm = fixture.nativeElement.querySelector('app-form-eye-size');
    expect(rightForm).toBeTruthy();
  });
});
