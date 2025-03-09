import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfLoadingService {
  
  private pdfUrl = 'assets/aaaa.pdf';
  constructor(private http: HttpClient) {}

  getPDF(): Promise<Blob>{
    return lastValueFrom(this.http.get(this.pdfUrl, { responseType: 'blob' }));
  }
}
