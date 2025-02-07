import { Injectable } from '@angular/core';
// import {Observable} from 'rxjs';
// import {Utilisateur} from "../models/utilisateur.model";
// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  // private apiUrl = 'http://localhost:3000/utilisateurs/login';

  // public utilisateurCourant : Utilisateur | undefined;
  // constructor(private httpClient: HttpClient) { }

  // login(email: string, password: string): Observable<boolean> {
  //   return new Observable<boolean>((observer) => {
  //     this.httpClient.post<Utilisateur>(this.apiUrl, { email, password }).subscribe(
  //       (user: Utilisateur) => {
  //         this.utilisateurCourant = user;
  //         console.log(this.utilisateurCourant);
  //         observer.next(true);
  //         observer.complete();
  //       },
  //       (error) => {
  //         observer.error(false);
  //         observer.complete();
  //       }
  //     );
  //   });
  // }

  // isloggedIn() : boolean {
  //   return !!this.utilisateurCourant;
  // }

  // getCurrentUser(): Utilisateur {
  //   return <Utilisateur>this.utilisateurCourant;
  // }
}
