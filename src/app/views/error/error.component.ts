import { ActivatedRoute } from "@angular/router";

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {
  errorMessage: string;
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.errorMessage = this.route.snapshot.queryParams['message'] || 'Ha ocurrido un error inesperado';
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
