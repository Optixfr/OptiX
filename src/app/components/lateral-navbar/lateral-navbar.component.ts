import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-lateral-navbar',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './lateral-navbar.component.html',
  styleUrl: './lateral-navbar.component.css'
})

export class LateralNavbarComponent {
  logoUrl: string = '../../../assets/home-2.svg';
}
