import { Component, input, output, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EyeMeasure } from '../../models/eyes-measure.model';

@Component({
  selector: 'app-form-eye-size',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './form-eye-size.component.html',
  styleUrls: ['./form-eye-size.component.scss']
})
export class FormEyeSizeComponent {
  readonly nomFormulaire = input.required<string>();
  readonly measure = input.required<EyeMeasure>();
  readonly measureChange = output<EyeMeasure>();

  // A local mutable copy to bind in ngModel without mutating the parent signal directly
  localMeasure: EyeMeasure = {
    sphere: '0',
    cylindre: '0',
    axe: '0',
    dhiv: '0',
    dvo: '0',
    k1: '0',
    x: '0',
    k2: '0',
    y: '0',
    excentricite: '0'
  };

  constructor() {
    // Keep local copy in sync when input signal changes
    effect(() => {
      this.localMeasure = { ...this.measure() };
    });
  }

  onMeasureChange() {
    this.measureChange.emit({ ...this.localMeasure });
  }

  fillTest2() {
    this.localMeasure = {
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
    };
    this.onMeasureChange();
  }

  fillTest1() {
    this.localMeasure = {
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
    };
    this.onMeasureChange();
  }
}
