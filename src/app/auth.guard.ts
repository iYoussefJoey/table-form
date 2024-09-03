import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import { TokenService } from './token.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router) as Router
  let tknService = inject(TokenService)
  let sessionFoundOrNot = localStorage.getItem('sessionToken') && tknService.getTokenExpiryDate()
  if (sessionFoundOrNot ) 
    //that a check if the token is null dont navigate and return to usersetting
    {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
}
// if the token is found or not 
// check if the time is expired or not if invalid route to usersetting
