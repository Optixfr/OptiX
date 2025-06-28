// ui.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from './form-duplication.reducer';

export const selectUiState = createFeatureSelector<UiState>('formDuplication');

export const selectIsFormDuplicated = (formId: string) => createSelector(
  selectUiState,
  (state) => state.duplicatedForms[formId] ?? false
);
