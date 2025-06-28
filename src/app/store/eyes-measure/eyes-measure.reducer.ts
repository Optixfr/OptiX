import { EyeMeasure } from "../../models/eyes-measure.model";
import {createFeature, createReducer, on} from "@ngrx/store"
import { eyesMeasureActions } from "./eyes-measure.actions"

export interface EyesFormState {
  gauche: EyeMeasure;
  droite: EyeMeasure;
}

const eyeMeasureInitialState: EyesFormState = {
    gauche: {
        sphere: '',
        cylindre: '',
        axe: '',
        dhiv: '',
        dvo: '',
        k1: '',
        x: '',
        k2: '',
        y: '',
        excentricite: ''
    },
    droite: {
        sphere: '',
        cylindre: '',
        axe: '',
        dhiv: '',
        dvo: '',
        k1: '',
        x: '',
        k2: '',
        y: '',
        excentricite: '',
      }
  };

export const eyesFormReducer = createReducer(
  eyeMeasureInitialState,
  on(eyesMeasureActions.updateLeftEye, (state, { measure }) => ({
    ...state,
    gauche: { ...state.gauche, ...measure }
  })),
  on(eyesMeasureActions.updateRightEye, (state, { measure }) => ({
    ...state,
    droite: { ...state.droite, ...measure }
  })),
  on(eyesMeasureActions.duplicateEyesMeasure, (state) => ({
    ...state,
    gauche: { ...state.droite}
  }))
);

export const eyesMeasureFeatureKey = createFeature({
  name: 'eyesForm',
  reducer: eyesFormReducer
});
