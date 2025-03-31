import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent, RouterModule],
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
}
