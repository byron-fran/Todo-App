import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { UsersService } from '../../users/users.service';
import { AuthStatus } from '../../users/enums/AuthStatus';
import { map, take } from 'rxjs';

export const noAuthteticatedGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    const userServices = inject(UsersService)
    const router = inject(Router)
    return userServices.authStatus$.subscribe(

        status => {

            if (status === AuthStatus.authenticated) {
                router.navigateByUrl('/tasks/list')
                return false
            }
            if (status === AuthStatus.notAuthenticated) {
                return true
            }
            return true
        }
    )
}
