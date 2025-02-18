import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ProgressBarService } from '../../services/progress-bar/progress-bar-service.service';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
})

export class ProgressBarComponent implements OnInit {
  constructor(public stepService: ProgressBarService) {}

  ngOnInit(): void {
    // Le service gère l'état, il n'y a rien à faire ici
  }
}
