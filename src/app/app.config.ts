import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import {provideState, provideStore} from '@ngrx/store';

import { eyesMeasureFeatureKey } from './store/eyes-measure/eyes-measure.reducer';
import { formDuplicationReducerFeatureKey } from './store/form-duplication/form-duplication.reducer';
import {eyesTearFeatureKey} from './store/eyes-tear/eyes-tear.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(),
    provideStore(),
    provideState(eyesMeasureFeatureKey),
    provideState(formDuplicationReducerFeatureKey),
    provideState(eyesTearFeatureKey)
  ]
};
