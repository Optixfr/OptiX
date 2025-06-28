import { createActionGroup, props, emptyProps} from '@ngrx/store';
import {EyesTear} from '../../models/eyes-tear.model';

export const EyesTearActions = createActionGroup({
  source: 'EyesTear',
  events: {
    'Get EyesTear': emptyProps(),
    'Get EyesTear Success': props<{ EyesTears: EyesTear[] }>(),
    'Get EyesTear Failure': emptyProps(),
    'Update Left Eye': props<{ measure: Partial<EyesTear> }>(),
    'Update Right Eye': props<{ measure: Partial<EyesTear> }>(),
    'Duplicate Eyes Tear': emptyProps(),
    'Reset Eyes': emptyProps(),
  }
});