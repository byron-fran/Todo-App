import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { isAuthteticatedGuard } from '../tasks/guards/is-authteticated.guard';
import { noAuthteticatedGuard } from '../tasks/guards/no-authteticated.guard';

const routes : Routes = [
  {
    path : '',
    children : [

      {path : 'login', component : LoginPageComponent},
      {path : 'register', component : RegisterPageComponent},
      {path : '**', redirectTo : 'login'},
    ],
    
    canActivate :[ noAuthteticatedGuard]
  },
  // {
  //   path : 'profile',
  //   canActivate : [isAuthteticatedGuard]
  // }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class UserRountingModule { }
