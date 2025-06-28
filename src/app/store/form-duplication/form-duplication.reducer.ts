
import {createFeature, createReducer, on} from '@ngrx/store';
import { setDuplicatedForm } from './form-duplication.actions';

export interface UiState {
  duplicatedForms: Record<string, boolean>;
}

export const initialUiState: UiState = {
  duplicatedForms: {}
};

export const formDuplicationReducer = createReducer(
  initialUiState,
  on(setDuplicatedForm, (state, { formId, isDuplicated }) => ({
    ...state,
    duplicatedForms: {
      ...state.duplicatedForms,
      [formId]: isDuplicated,
    }
  }))
);

export const formDuplicationReducerFeatureKey = createFeature({
  name: 'formDuplication',
  reducer: formDuplicationReducer
});

