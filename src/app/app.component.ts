import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LateralNavbarComponent } from "./components/lateral-navbar/lateral-navbar.component";
import { TopBarComponent } from "./components/top-bar/top-bar.component";
import { FormSizeEyesPageComponent } from "./pages/form-size-eyes-page/form-size-eyes-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Optix';
}
