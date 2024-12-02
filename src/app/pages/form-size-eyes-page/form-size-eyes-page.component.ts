import { Component } from '@angular/core';
import { LateralNavbarComponent } from "../../components/lateral-navbar/lateral-navbar.component";
import { TopBarComponent } from "../../components/top-bar/top-bar.component";
import { FormEyeSizeComponent } from "../../components/form-eye-size/form-eye-size.component";

@Component({
  selector: 'app-form-size-eyes-page',
  standalone: true,
  imports: [LateralNavbarComponent, TopBarComponent, FormEyeSizeComponent],
  templateUrl: './form-size-eyes-page.component.html',
  styleUrl: './form-size-eyes-page.component.css'
})
export class FormSizeEyesPageComponent {

}
