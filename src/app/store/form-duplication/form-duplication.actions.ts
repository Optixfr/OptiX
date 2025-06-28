
// ui.actions.ts
import { createAction, props } from '@ngrx/store';

export const setDuplicatedForm = createAction(
  'Set Duplicated Form', props<{ formId: string; isDuplicated: boolean }>()
);
