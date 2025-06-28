import { Component } from '@angular/core';
import { TopBarComponent } from "../../components/top-bar/top-bar.component";
import { LateralNavbarComponent } from "../../components/lateral-navbar/lateral-navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [TopBarComponent, LateralNavbarComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {

}
