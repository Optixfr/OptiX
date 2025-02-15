import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-lateral-navbar',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, RouterModule],
  templateUrl: './lateral-navbar.component.html',
})
export class LateralNavbarComponent {
  
  logoUrl = '../../../assets/home-2.svg';

  constructor(private router: Router) {}
  
  isActive(route: string): boolean {
    return this.router.url === route;
  }

  deco() {
    const confirmation = confirm('Voulez vous vous déconnecter');
    if (confirmation) {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/connexion');
    }
  }
}
