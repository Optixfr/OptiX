import {createFeatureSelector, createSelector} from '@ngrx/store';
import {EyesFormState} from './eyes-tear.reducer';

export const selectEyesTearForm = createFeatureSelector<EyesFormState>('eyesTearForm');
export const selectLeftEyeTear = createSelector(selectEyesTearForm, state => state.gauche);
export const selectRightEyeTear = createSelector(selectEyesTearForm, state => state.droite);