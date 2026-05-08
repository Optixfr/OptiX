import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EyeMeasure } from '../../models/eyes-measure.model';


@Component({
  selector: 'app-form-eye-size',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-eye-size.component.html'
})
export class FormEyeSizeComponent {
  readonly nomFormulaire = input.required<string>();
  readonly measure = input.required<EyeMeasure>();
  readonly measureChange = output<EyeMeasure>();

  onMeasureChange() {
    this.measureChange.emit(this.measure());
  }

  // Temporary helper methods for testing, kept but updated to emit changes
  fillTest2() {
    const formDataTest2: EyeMeasure = {
      sphere: '5',
      cylindre: '-1.25',
      axe: '100',
      dhiv: '12',
      dvo: '11',
      k1: '8.05',
      x: '100',
      k2: '7.8',
      y: '10',
      excentricite: '0.65',
    }
    this.measureChange.emit(formDataTest2);
  }

  fillTest1() {
    const formDataTest1: EyeMeasure = {
      sphere: '-8',
      cylindre: '-3',
      axe: '10',
      dhiv: '12',
      dvo: '11',
      k1: '7.8',
      x: '10',
      k2: '7.3',
      y: '100',
      excentricite: '0.3',
    }
    this.measureChange.emit(formDataTest1);
  }
}

