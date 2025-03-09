import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormSizeEyesDataService } from '../../services/form-eyes-size/form-size-eyes-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-eye-size',
  templateUrl: './form-eye-size.component.html',
  imports: [ReactiveFormsModule, CommonModule],
})
export class FormEyeSizeComponent implements OnInit {
  @Input() nomFormulaire = '';
  @Output() formValidity = new EventEmitter<boolean>(); // 🔹 Émet la validité du formulaire

  eyeMeasureForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(FormSizeEyesDataService) private formSizeEyesDataService: FormSizeEyesDataService
  ) {}

  ngOnInit() {
    this.eyeMeasureForm = this.fb.group({
      sphere: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]],
      cylindre: ['', Validators.required],
      axe: ['', [Validators.required, Validators.min(0), Validators.max(180)]],
      dvo: ['', Validators.required],
      dhiv: ['', Validators.required],
      k1: ['', Validators.required],
      k2: ['', Validators.required],
      excentricite: ['', Validators.required],
    });

    // 🔹 Écoute les changements et informe le parent
    this.eyeMeasureForm.statusChanges.subscribe(status => {
      this.formValidity.emit(this.eyeMeasureForm.valid);
    });
  }
  
  isInvalid(field: string): boolean {
    return this.eyeMeasureForm.controls[field].invalid && this.eyeMeasureForm.controls[field].touched;
  }

  getFormData() {
    return this.eyeMeasureForm.value;
    console.log('Formulaire soumis :', this.eyeMeasureForm.value);
  }
}
