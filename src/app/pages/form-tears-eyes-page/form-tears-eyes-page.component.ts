import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importer HttpClientModule
import { EyesCalculationService } from '../../services/calculation/eyes-calculation.service';
import { FormTearsEyesComponent } from '../../components/form-tears-eyes/form-tears-eyes.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {Store} from '@ngrx/store';
import {setDuplicatedForm} from '../../store/form-duplication/form-duplication.actions';
import {eyesMeasureActions} from '../../store/eyes-measure/eyes-measure.actions';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import { selectIsFormDuplicated } from '../../store/form-duplication/form-duplication.selectors';

@Component({
    selector: 'app-form-tears-eyes-page',
    imports: [HttpClientModule, FormTearsEyesComponent, FormsModule, RouterLink, AsyncPipe],
    providers: [EyesCalculationService],
    templateUrl: './form-tears-eyes-page.component.html'
})

export class FormTearsEyesPageComponent implements OnInit {
  isDuplicated$!: Observable<boolean>;
  formId = 'formB';

  commentaire$!: Observable<string>;


  @ViewChildren(FormTearsEyesComponent) forms!: QueryList<FormTearsEyesComponent>; 

  constructor(private router: Router, private store: Store) {}

  submitForms() {
//    TODO send data to backend
  }

  ngOnInit() {
    this.isDuplicated$ = this.store.select(selectIsFormDuplicated(this.formId));
  }

  addSideForm(): void {
    this.store.dispatch(setDuplicatedForm({ formId: this.formId, isDuplicated: true }));
    this.store.dispatch(eyesMeasureActions.duplicateEyesMeasure());
    this.store.subscribe(state => {
      console.log('État du store :', state);
    });
  }
}