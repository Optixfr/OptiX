import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EyesTear } from '../../models/eyes-tear.model';
import { CommonModule } from '@angular/common';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import {selectLeftEyeTear, selectRightEyeTear} from '../../store/eyes-tear/eyes-tear.selectors';
import { EyesTearActions } from '../../store/eyes-tear/eyes-tear.actions';

@Component({
    selector: 'app-form-tears-eyes',
    imports: [FormsModule, CommonModule],
    templateUrl: './form-tears-eyes.component.html'
})

export class FormTearsEyesComponent implements OnInit {
  @Input() nomFormulaire = '';
  @Input() side: 'gauche' | 'droite' | 'both' = 'both';

  eyeTear$!: Observable<EyesTear>;

  constructor(private store: Store) {}

ngOnInit() {
  switch (this.side) {
    case 'gauche':
      this.eyeTear$ = this.store.select(selectLeftEyeTear);
      break;
    case 'droite':
      this.eyeTear$ = this.store.select(selectRightEyeTear);
      break;
    case 'both':
      this.eyeTear$ = this.store.select(selectRightEyeTear);
      break;
  }
}

onInputChange(field: keyof EyesTear, event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  const measure = { [field]: value } as Partial<EyesTear>;

  switch (this.side) {
    case 'gauche':
      this.store.dispatch(EyesTearActions.updateLeftEye({ measure }));
      break;
    case 'droite':
      this.store.dispatch(EyesTearActions.updateRightEye({ measure }));
      break;
    case 'both':
      this.store.dispatch(EyesTearActions.updateLeftEye({ measure }));
      this.store.dispatch(EyesTearActions.updateRightEye({ measure }));
      break;
  }
}
}
