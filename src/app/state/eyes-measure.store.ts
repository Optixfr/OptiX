import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { EyeMeasure } from '../models/eyes-measure.model';

export interface EyesMeasureState {
    droite: EyeMeasure;
    gauche: EyeMeasure;
    isDuplicated: boolean;
}

const initialState: EyesMeasureState = {
    droite: {
        sphere: '0',
        cylindre: '0',
        axe: '0',
        dhiv: '0',
        dvo: '0',
        k1: '0',
        x: '0',
        k2: '0',
        y: '0',
        excentricite: '0',
    },
    gauche: {
        sphere: '0',
        cylindre: '0',
        axe: '0',
        dhiv: '0',
        dvo: '0',
        k1: '0',
        x: '0',
        k2: '0',
        y: '0',
        excentricite: '0',
    },
    isDuplicated: false,
};

export const EyesMeasureStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        updateRightEye(measure: Partial<EyeMeasure>) {
            patchState(store, (state) => ({
                droite: { ...state.droite, ...measure },
                gauche: state.isDuplicated ? { ...state.droite, ...measure } : state.gauche,
            }));
        },
        updateLeftEye(measure: Partial<EyeMeasure>) {
            patchState(store, (state) => ({
                gauche: { ...state.gauche, ...measure },
            }));
        },
        setFormData(data: { droite: EyeMeasure; gauche: EyeMeasure }) {
            patchState(store, {
                droite: data.droite,
                gauche: data.gauche,
            });
        },
        duplicateRightForm() {
            patchState(store, (state) => ({
                gauche: { ...state.droite },
                isDuplicated: true,
            }));
        },
        reset() {
            patchState(store, initialState);
        },
    }))
);
