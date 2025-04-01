import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent, RouterModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  tabs = [
    { label: 'Mis datos', route: 'mis-datos' },
    { label: 'Mis tareas', route: 'mis-tareas' },
    { label: 'Mis devoluciones', route: 'mis-devoluciones' },
    { label: 'Mis comunicaciones', route: 'mis-comunicaciones' },
    { label: 'Mis mejores amigos', route: 'mis-mejores-amigos' },
  ];
  currentRoute = signal('');
  private router = inject(Router);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute.set(event.url);
    });
  }
}
