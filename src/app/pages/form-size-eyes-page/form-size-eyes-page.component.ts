import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import { FormEyeSizeComponent } from '../../components/form-eye-size/form-eye-size.component';
import { Router, RouterLink } from '@angular/router';
import {Store} from '@ngrx/store';
import {eyesMeasureActions} from '../../store/eyes-measure/eyes-measure.actions';
import {Observable} from 'rxjs';
import {selectIsFormDuplicated} from '../../store/form-duplication/form-duplication.selectors';
import {setDuplicatedForm} from '../../store/form-duplication/form-duplication.actions';
import {AsyncPipe} from '@angular/common';

@Component({
    selector: 'app-form-size-eyes-page',
    imports: [
        FormEyeSizeComponent,
        RouterLink,
        AsyncPipe,
    ],
    templateUrl: './form-size-eyes-page.component.html'
})
export class FormSizeEyesPageComponent implements OnInit {
  isDuplicated$!: Observable<boolean>;
  formId = 'formA';
  
  @ViewChildren(FormEyeSizeComponent) forms!: QueryList<FormEyeSizeComponent>; 

  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    this.isDuplicated$ = this.store.select(selectIsFormDuplicated(this.formId));
  }
  
  addSideForm(): void {
    this.store.dispatch(setDuplicatedForm({ formId: this.formId, isDuplicated: true }));
    this.store.dispatch(eyesMeasureActions.duplicateEyesMeasure());
  }
}
