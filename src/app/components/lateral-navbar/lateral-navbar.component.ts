import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NavbarService } from '../../services/navbar-service/navbar-service.service';

@Component({
    selector: 'app-lateral-navbar',
    imports: [RouterLink, NgOptimizedImage, RouterModule],
    templateUrl: './lateral-navbar.component.html'
})
export class LateralNavbarComponent {
  
  isExtended  = false;
  
  logoUrl = '../../../assets/home-2.svg';

  constructor(private router: Router, private navbarService: NavbarService) {}
  

  ngOnInit(): void {
    this.navbarService.isExtended$.subscribe(isExtended => {
      this.isExtended = isExtended;
    });
  }
  
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
  
  setExtension(): void {
    this.isExtended = !this.isExtended;
  }
}
