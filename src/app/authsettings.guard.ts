import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';

export const authsettingsGuard: CanActivateFn = (route, state) => {
  let router = inject(Router) as Router
  if (localStorage.getItem('sessionToken') !== null) {
    {
      router.navigate(['/table']);
      return false;
    }
  } else {
    return true;
  }
}
