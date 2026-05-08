import { TestBed } from '@angular/core/testing';
import { EyesMeasureStore } from './eyes-measure.store';
import { EyeMeasure } from '../models/eyes-measure.model';

describe('EyesMeasureStore', () => {
    let store: InstanceType<typeof EyesMeasureStore>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EyesMeasureStore],
        });
        store = TestBed.inject(EyesMeasureStore);
    });

    it('should initialize with default values', () => {
        expect(store.droite().sphere).toBe('0');
        expect(store.gauche().sphere).toBe('0');
        expect(store.isDuplicated()).toBe(false);
    });

    it('should update right eye', () => {
        store.updateRightEye({ sphere: '-2.00' });
        expect(store.droite().sphere).toBe('-2.00');
    });

    it('should duplicate right eye to left eye', () => {
        store.updateRightEye({ sphere: '-3.00' });
        store.duplicateRightForm();

        expect(store.isDuplicated()).toBe(true);
        expect(store.gauche().sphere).toBe('-3.00');
    });

    it('should sync left eye when duplicated and right eye changes', () => {
        store.duplicateRightForm();
        store.updateRightEye({ sphere: '-4.00' });

        expect(store.droite().sphere).toBe('-4.00');
        expect(store.gauche().sphere).toBe('-4.00');
    });

    it('should not sync left eye when NOT duplicated and right eye changes', () => {
        store.updateRightEye({ sphere: '-5.00' });

        expect(store.droite().sphere).toBe('-5.00');
        expect(store.gauche().sphere).toBe('0'); // Default
    });

    it('should update left eye independently', () => {
        store.updateLeftEye({ sphere: '-1.00' });
        expect(store.gauche().sphere).toBe('-1.00');
        expect(store.droite().sphere).toBe('0');
    });

    it('should reset state', () => {
        store.updateRightEye({ sphere: '-2.00' });
        store.duplicateRightForm();
        store.reset();

        expect(store.droite().sphere).toBe('0');
        expect(store.isDuplicated()).toBe(false);
    });
});
