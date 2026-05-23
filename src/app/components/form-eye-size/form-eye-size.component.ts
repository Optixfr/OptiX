import { Component, input, output, effect, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { debounced } from '@angular/core';
import {
  form,
  schema,
  required,
  pattern,
  validateHttp,
  FormField
} from '@angular/forms/signals';
import type { HttpResourceRequest } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EyeMeasure } from '../../models/eyes-measure.model';

/** Accepts an optionally-signed integer or decimal, e.g. "-1.25", "100", "0.65". */
const NUMERIC = /^-?\d+(\.\d+)?$/;

/**
 * Signal Forms schema for an EyeMeasure. Every field is required and must hold a
 * numeric string. The `sphere` field additionally demonstrates server-backed
 * async validation via `validateHttp` (Angular 22).
 */
const eyeMeasureSchema = schema<EyeMeasure>((path) => {
  required(path.sphere);
  pattern(path.sphere, NUMERIC);
  required(path.cylindre);
  pattern(path.cylindre, NUMERIC);
  required(path.axe);
  pattern(path.axe, NUMERIC);
  required(path.dhiv);
  pattern(path.dhiv, NUMERIC);
  required(path.dvo);
  pattern(path.dvo, NUMERIC);
  required(path.k1);
  pattern(path.k1, NUMERIC);
  required(path.x);
  pattern(path.x, NUMERIC);
  required(path.k2);
  pattern(path.k2, NUMERIC);
  required(path.y);
  pattern(path.y, NUMERIC);
  required(path.excentricite);
  pattern(path.excentricite, NUMERIC);

  // Server-backed async validation (Angular 22 `validateHttp`).
  // `when` gates the call so it only fires once the value is a well-formed
  // number (never on partial/invalid input, and dormant in unit tests), and
  // `debounce` coalesces rapid typing — so we never spam the backend.
  validateHttp(path.k1, {
    when: (ctx) => NUMERIC.test(ctx.value()),
    debounce: 500,
    request: (ctx): HttpResourceRequest => ({
      url: '/api/calcul/validate',
      method: 'POST',
      body: { k1: ctx.value() }
    }),
    // A `{ valid: false }` response surfaces a blocking error on the field.
    onSuccess: (result) =>
      (result as { valid?: boolean } | null)?.valid === false
        ? { kind: 'server', message: 'Valeur K1 rejetée par le serveur.' }
        : null,
    // Server/network hiccups must not block the user — treat them as non-fatal.
    onError: () => null
  });
});

@Component({
  selector: 'app-form-eye-size',
  standalone: true,
  imports: [
    FormField,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './form-eye-size.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./form-eye-size.component.scss']
})
export class FormEyeSizeComponent {
  readonly nomFormulaire = input.required<string>();
  readonly measure = input.required<EyeMeasure>();
  readonly measureChange = output<EyeMeasure>();

  // Local writable model driving the signal form.
  private readonly model = signal<EyeMeasure>({
    sphere: '0',
    cylindre: '0',
    axe: '0',
    dhiv: '0',
    dvo: '0',
    k1: '0',
    x: '0',
    k2: '0',
    y: '0',
    excentricite: '0'
  });

  /** The signal form bound to the template via the `[formField]` directive. */
  readonly eyeForm = form(this.model, eyeMeasureSchema);

  /** True once every field passes its synchronous validators. */
  readonly isValid = computed(() => this.eyeForm().valid());

  // `debounced()` (Angular 22) yields a Resource that trails the model by 300ms,
  // so rapid typing emits a single coalesced change to the parent/store.
  private readonly debouncedMeasure = debounced(() => this.model(), 300);

  constructor() {
    // Keep the form model in sync when the parent input signal changes.
    effect(() => {
      this.model.set({ ...this.measure() });
    });

    // Emit the debounced value upward.
    effect(() => {
      if (this.debouncedMeasure.hasValue()) {
        this.measureChange.emit({ ...this.debouncedMeasure.value() });
      }
    });
  }

  fillTest2() {
    this.model.set({
      sphere: '5',
      cylindre: '-1.25',
      axe: '100',
      dhiv: '12',
      dvo: '11',
      k1: '8.05',
      x: '100',
      k2: '7.8',
      y: '10',
      excentricite: '0.65'
    });
  }

  fillTest1() {
    this.model.set({
      sphere: '-8',
      cylindre: '-3',
      axe: '10',
      dhiv: '12',
      dvo: '11',
      k1: '7.8',
      x: '10',
      k2: '7.3',
      y: '100',
      excentricite: '0.3'
    });
  }
}
