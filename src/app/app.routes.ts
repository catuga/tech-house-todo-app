import { Routes } from '@angular/router';
import { MisDatosComponent } from './views/mis-datos/mis-datos.component';
import { MisTareasComponent } from './views/mis-tareas/mis-tareas.component';
import { MisDevolucionesComponent } from './views/mis-devoluciones/mis-devoluciones.component';
import { MisComunicacionesComponent } from './views/mis-comunicaciones/mis-comunicaciones.component';
import { MisMejoresAmigosComponent } from './views/mis-mejores-amigos/mis-mejores-amigos.component';

const routeConfig: Routes = [
  { path: '', redirectTo: 'mis-datos', pathMatch: 'full' },
  {
    path: 'mis-datos',
    component: MisDatosComponent,
    title: 'Mis datos',
  },
  {
    path: 'mis-tareas',
    component: MisTareasComponent,
    title: 'Mis tareas',
  },
  {
    path: 'mis-devoluciones',
    component: MisDevolucionesComponent,
    title: 'Mis devoluciones',
  },
  {
    path: 'mis-comunicaciones',
    component: MisComunicacionesComponent,
    title: 'Mis comunicaciones',
  },
  {
    path: 'mis-mejores-amigos',
    component: MisMejoresAmigosComponent,
    title: 'Mis mejores-amigos',
  },
];

export default routeConfig;