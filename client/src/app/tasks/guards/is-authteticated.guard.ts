import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { UsersService } from '../../users/users.service';
import { AuthStatus } from '../../users/enums/AuthStatus';
import { map, take, firstValueFrom } from 'rxjs';

export const isAuthteticatedGuard =  (route :  ActivatedRouteSnapshot, state : RouterStateSnapshot) => {

  const userServices = inject(UsersService)
  const router = inject(Router)

  return userServices.authStatus$.subscribe(

    status => {
   
      if(status === AuthStatus.authenticated){
        return true
      }
      if(status  === AuthStatus.notAuthenticated){
        return false
      }
      router.navigateByUrl('/auth/login')
      return false
    }
  )

}; 
