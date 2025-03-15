import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EyesCalculationService {
  private apiUrl = 'https://apioptix.jeremypatapy.fr/api/calcul';

  constructor(private http: HttpClient) {}

  sendData(data: any): Observable<any> {
    console.log(data);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.apiUrl, data, { headers });
  }
}
