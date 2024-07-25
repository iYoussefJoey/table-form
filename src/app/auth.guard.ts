import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router) as Router
  if(localStorage.getItem('sessionToken')){
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
}
