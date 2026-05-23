import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EyesCalculationService {
  private get apiBaseUrl(): string {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:3000';
    }
    return 'https://apioptix.jeremypatapy.fr';
  }

  constructor(private http: HttpClient) {}

  sendData(data: any): Observable<any> {
    console.log(data);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiBaseUrl}/api/calcul`, data, { headers });
  }

  fetchCalculPDF(data: any): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiBaseUrl}/api/calcul/pdf`, data, {
      headers,
      responseType: 'blob'
    });
  }
}
