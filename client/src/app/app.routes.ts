import { Routes } from '@angular/router';
import { isAuthteticatedGuard } from './tasks/guards/is-authteticated.guard';

export const routes: Routes = [
    {
        path : 'auth',
        loadChildren : () => import('./users/user-routing.module').then(m => m.UserRountingModule)
    },
    {
        path : 'tasks',
        loadChildren : () => import('./tasks/tasks-routing.module').then(m => m.TasksRoutingModdule),
        canActivate : [isAuthteticatedGuard]
    },
    {path : '**', redirectTo : 'tasks'}
];
