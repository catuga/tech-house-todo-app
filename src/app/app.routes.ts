import { Routes } from '@angular/router';
import { MyTasksComponent } from './views/my-tasks/my-tasks.component';
import { MyProfileComponent } from './views/my-profile/my-profile.component';
import { MyReturnsComponent } from './views/my-returns/my-returns.component';
import { MyBestFriendsComponent } from './views/my-best-friends/my-best-friends.component';
import { MyCommunicationsComponent } from './views/my-communications/my-communications.component';
import { ErrorComponent } from './views/error/error.component';

const routeConfig: Routes = [
  { path: '', redirectTo: 'mis-datos', pathMatch: 'full' },
  {
    path: 'mis-datos',
    component: MyProfileComponent,
    title: 'Mis datos',
  },
  {
    path: 'mis-tareas',
    component: MyTasksComponent,
    title: 'Mis tareas',
  },
  {
    path: 'mis-devoluciones',
    component: MyReturnsComponent,
    title: 'Mis devoluciones',
  },
  {
    path: 'mis-comunicaciones',
    component: MyCommunicationsComponent,
    title: 'Mis comunicaciones',
  },
  {
    path: 'mis-mejores-amigos',
    component: MyBestFriendsComponent,
    title: 'Mis mejores-amigos',
  },
  {
    path: 'error',
    component: ErrorComponent,
    title: 'Error'
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];

export default routeConfig;