import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { ProgressBarService } from '../../services/progress-bar/progress-bar-service.service';

@Component({
    selector: 'app-progress-bar',
    standalone: true,
    imports: [MatStepperModule],
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  constructor(public stepService: ProgressBarService) {}

  onSelectionChange(event: any) {
    const stepIndex = event.selectedIndex + 1;
    this.stepService.setStep(stepIndex);
  }
}
