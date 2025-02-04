import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-connexion-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './connexion-form.component.html',
  styleUrl: './connexion-form.component.css'
})
export class ConnexionFormComponent implements OnInit {
  email = '';
  password = '';
  noconnexion = false;

  constructor(private connexionService: ConnexionService, private router: Router) {}

  ngOnInit(): void {
    // Initialisation
  }

  login() {
    this.noconnexion = false;
    // this.connexionService.login(this.email, this.password).subscribe(result => {
    //   if (result && this.connexionService.isloggedIn()) {
    //     localStorage.setItem('token', Math.random().toString());
    //     this.router.navigateByUrl('/home');
    //   } else {
    //     this.noconnexion = true;
    //   }
    // }, error => {
    //   this.noconnexion = true;
    // });
  }

  // logout() {
  //   const confirmation=confirm('Voulez vous vous déconnecter');
  //   if (confirmation){
  //     localStorage.removeItem('token');
  //     this.router.navigateByUrl('/connexion');
  //   }
  // }
}
