import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-lateral-navbar',
  standalone: true,
  imports: [],
  templateUrl: './lateral-navbar.component.html',
  styleUrl: './lateral-navbar.component.css'
})

export class LateralNavbarComponent {
  logoUrl = '../../../assets/home-2.svg';

  constructor(private router: Router) {
  }

  deco() {
    const confirmation= confirm('Voulez vous vous déconnecter');
    if (confirmation) {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/connexion');
    }
  }
}
