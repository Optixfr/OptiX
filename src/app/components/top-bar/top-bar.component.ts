import { Component } from '@angular/core';
import { NavbarService } from '../../services/navbar-service/navbar-service.service';
import { ProgressBarComponent } from "../progress-bar/progress-bar.component";

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [ProgressBarComponent],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  
  constructor(private navbarService: NavbarService) {}

  extend() {
    this.navbarService.toggleExtension(); 
  }
}
