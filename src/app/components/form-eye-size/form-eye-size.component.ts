import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EyeMeasure } from '../../models/eyes-measure.model';
import { CommonModule } from '@angular/common';
import { eyesMeasureActions } from '../../store/eyes-measure/eyes-measure.actions';
import { selectLeftEyeMeasure, selectRightEyeMeasure } from '../../store/eyes-measure/eyes-measure.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-form-eye-size',
    imports: [FormsModule, CommonModule],
    templateUrl: './form-eye-size.component.html'
})
export class FormEyeSizeComponent implements OnInit {
  @Input() nomFormulaire = '';
  @Input() side: 'gauche' | 'droite' | 'both' = 'both';

  eyeMeasure$!: Observable<EyeMeasure>;

  constructor(private store: Store) {}

ngOnInit() {
  switch (this.side) {
    case 'gauche':
      this.eyeMeasure$ = this.store.select(selectLeftEyeMeasure);
      break;
    case 'droite':
      this.eyeMeasure$ = this.store.select(selectRightEyeMeasure);
      break;
    case 'both':
      this.eyeMeasure$ = this.store.select(selectRightEyeMeasure);
      break;
  }
}

onInputChange(field: keyof EyeMeasure, event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.valueAsNumber;
  const measure = { [field]: value } as Partial<EyeMeasure>;

  switch (this.side) {
    case 'gauche':
      this.store.dispatch(eyesMeasureActions.updateLeftEye({ measure }));
      break;
    case 'droite':
      this.store.dispatch(eyesMeasureActions.updateRightEye({ measure }));
      break;
    case 'both':
      this.store.dispatch(eyesMeasureActions.updateLeftEye({ measure }));
      this.store.dispatch(eyesMeasureActions.updateRightEye({ measure }));
      break;
  }
}

  // Temporary
  fillTest2() {
    const formDataTest2: Partial<EyeMeasure> = {
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

    switch (this.side) {
      case 'gauche':
        this.store.dispatch(eyesMeasureActions.updateLeftEye({ measure: formDataTest2 }));
        break;
      case 'droite':
        this.store.dispatch(eyesMeasureActions.updateRightEye({ measure: formDataTest2 }));
        break;
      case 'both':
        this.store.dispatch(eyesMeasureActions.updateLeftEye({ measure: formDataTest2 }));
        this.store.dispatch(eyesMeasureActions.updateRightEye({ measure: formDataTest2 }));
        break;
    }
  }
  
  fillTest1() {
    const formDataTest1: Partial<EyeMeasure> = {
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

    switch (this.side) {
      case 'gauche':
        this.store.dispatch(eyesMeasureActions.updateLeftEye({ measure: formDataTest1 }));
        break;
      case 'droite':
        this.store.dispatch(eyesMeasureActions.updateRightEye({ measure: formDataTest1 }));
        break;
      case 'both':
        this.store.dispatch(eyesMeasureActions.updateLeftEye({ measure: formDataTest1 }));
        this.store.dispatch(eyesMeasureActions.updateRightEye({ measure: formDataTest1 }));
        break;
    }
  }
}