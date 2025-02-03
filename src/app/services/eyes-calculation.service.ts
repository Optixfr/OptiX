import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EyesCalculationService {

  private apiUrl = 'https://apioptix.jeremypatapy.fr/api/calcul/';

  constructor(private http: HttpClient) { }

  sendData(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Retourner l'observable pour récupérer les données
    return this.http.post<any>(this.apiUrl, {data}, { headers });
  }
}
