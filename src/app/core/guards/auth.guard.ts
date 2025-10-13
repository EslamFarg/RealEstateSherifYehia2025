import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let token = JSON.parse(localStorage.getItem('payloadUser')!)?.token;
  let router=inject(Router)
  if(token){
    return true;
  }else{
    router.navigate(['/auth'])
    return false;
  }
};
