import {createFeatureSelector, createSelector} from '@ngrx/store';
import {EyesFormState} from './eyes-measure.reducer';

export const selectEyesForm = createFeatureSelector<EyesFormState>('eyesForm');
export const selectLeftEyeMeasure = createSelector(selectEyesForm, state => state.gauche);
export const selectRightEyeMeasure = createSelector(selectEyesForm, state => state.droite);