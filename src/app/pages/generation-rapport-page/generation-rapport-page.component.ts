import { Component, OnInit, OnDestroy } from '@angular/core';
import { LateralNavbarComponent } from '../../components/lateral-navbar/lateral-navbar.component';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormSizeEyesDataService } from '../../services/form-eyes-size/form-size-eyes-data.service';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EyesCalculationService } from '../../services/calculation/eyes-calculation.service';
import { Subscription } from 'rxjs';
import { EyesTear } from '../../models/eyes-tear.model';
import { FormTearsEyesDataService } from '../../services/form-tear-size/form-tears-eyes-data.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PdfGenerationService } from '../../services/pdf/pdf-generation.service';

@Component({
    selector: 'app-generation-rapport-page',
    imports: [
    LateralNavbarComponent,
    TopBarComponent,
    CommonModule,
    RouterLink,
    HttpClientModule,
    FormsModule,
],
    templateUrl: './generation-rapport-page.component.html'
})
export class GenerationRapportPageComponent implements OnInit, OnDestroy {
  pdfUrl: SafeResourceUrl | undefined;
  pdfSettings: string = '#toolbar=0&navpanes=0&scrollbar=0&view=FitH&view=FitW';
  dataSubscription: Subscription | undefined;

  constructor(
    private pdfService: PdfGenerationService
  ) {}

  ngOnInit() {
    this.pdfUrl = this.pdfService.generateAlldocumentsPDF();
  }

  ngOnDestroy() {
    if (this.pdfUrl) {
      URL.revokeObjectURL(this.pdfUrl as string);
    }
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  downloadPDF(): void {
    if (this.pdfUrl) {
      const link = document.createElement('a');
      link.href = this.pdfUrl as string;
      link.download = 'form-data-preview.pdf';
      link.click();

      URL.revokeObjectURL(this.pdfUrl as string);
    }
  }
}
