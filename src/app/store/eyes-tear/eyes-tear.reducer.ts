import {createFeature, createReducer, on} from "@ngrx/store"
import { EyesTearActions } from "./eyes-tear.actions"
import {EyesTear} from '../../models/eyes-tear.model';

export interface EyesFormState {
  gauche: EyesTear;
  droite: EyesTear;
  commentaire: string;
}

const eyeTearInitialState: EyesFormState = {
    droite: {
      psc: 'standard',
      tonus: 'standard',
      hauteurPrisme: '',
      gradeLipide: 'standard',
      chargeLacrimale: 'standard',
    },
    gauche: {
      psc: 'standard',
      tonus: 'standard',
      hauteurPrisme: '',
      gradeLipide: 'standard',
      chargeLacrimale: 'standard',
    },
    commentaire: '',
  };

export const eyesTearFormReducer = createReducer(
  eyeTearInitialState,
  on(EyesTearActions.updateLeftEye, (state, { measure }) => ({
    ...state,
    gauche: { ...state.gauche, ...measure }
  })),
  on(EyesTearActions.updateRightEye, (state, { measure }) => ({
    ...state,
    droite: { ...state.droite, ...measure }
  })),
  on(EyesTearActions.duplicateEyesTear, (state) => ({
    ...state,
    gauche: { ...state.droite}
  }))
);

export const eyesTearFeatureKey = createFeature({
  name: 'eyesTearForm',
  reducer: eyesTearFormReducer
});
