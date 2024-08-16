import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router) as Router
  if (localStorage.getItem('sessionToken') && localStorage.getItem('sessionToken') !== null) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
}
// if the token is found or not 
// check if the time is expired or not if invalid route to usersetting
