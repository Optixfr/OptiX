import { createAction, props } from '@ngrx/store';
import { EyeFormState } from '../../eye-form.model';

export const updateEyeForm = createAction(
  '[Eye Form] Update',
  props<{ form: Partial<EyeFormState> }>()
);

export const resetEyeForm = createAction('[Eye Form] Reset');