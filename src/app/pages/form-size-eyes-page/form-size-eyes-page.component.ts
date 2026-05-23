import { Component, inject } from '@angular/core';
import { FormEyeSizeComponent } from '../../components/form-eye-size/form-eye-size.component';
import { RouterLink } from '@angular/router';
import { EyesMeasureStore } from '../../state/eyes-measure.store';

@Component({
  selector: 'app-form-size-eyes-page',
  standalone: true,
  imports: [
    FormEyeSizeComponent,
    RouterLink,
  ],
  templateUrl: './form-size-eyes-page.component.html'
})
export class FormSizeEyesPageComponent {
  readonly store = inject(EyesMeasureStore);
}
