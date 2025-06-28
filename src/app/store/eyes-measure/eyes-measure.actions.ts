import { createActionGroup, props, emptyProps} from '@ngrx/store';
import { EyeMeasure } from '../../models/eyes-measure.model';

export const eyesMeasureActions = createActionGroup({
  source: 'EyesMeasure',
  events: {
    'Get EyesMeasure': emptyProps(),
    'Get EyesMeasure Success': props<{ eyesMeasures: EyeMeasure[] }>(),
    'Get EyesMeasure Failure': emptyProps(),
    'Update Left Eye': props<{ measure: Partial<EyeMeasure> }>(),
    'Update Right Eye': props<{ measure: Partial<EyeMeasure> }>(),
    'Duplicate Eyes Measure': emptyProps(),
    'Reset Eyes': emptyProps(),
  }
});