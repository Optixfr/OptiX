import { Component } from '@angular/core';
import { NavbarService } from '../../services/navbar-service/navbar-service.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  
  constructor(private navbarService: NavbarService) {}

  extend() {
    this.navbarService.toggleExtension(); 
  }
}
