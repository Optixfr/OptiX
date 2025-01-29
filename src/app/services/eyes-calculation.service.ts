import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EyesCalculationService {


  private apiUrl = 'localhost:8080/api/calcul'; 

  constructor(private http: HttpClient) { }

  sendData(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });

    return this.http.post<any>(this.apiUrl, {data}, { headers });
  }
}
