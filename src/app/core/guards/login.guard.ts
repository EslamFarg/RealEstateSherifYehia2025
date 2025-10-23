import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  // let token=JSON.parse(localStorage.getItem('payloadUser')!)?.token;
  let router=inject(Router)
    const payloadStr = localStorage.getItem('payloadUser');
  let token: string | null = null;

   if (payloadStr && payloadStr !== 'undefined' && payloadStr !== 'null') {
    try {
      const payload = JSON.parse(payloadStr);
      token = payload?.token ?? null;
    } catch (err) {
      console.error('⚠️ payloadUser JSON is invalid:', err);
      token = null;
    }
  }
  
   if (token) {
    // المستخدم داخل بالفعل → نمنعه من دخول صفحة تسجيل الدخول
    router.navigate(['/dashboard']);
    return false;
  }

  // المستخدم مش داخل → نسمح له يدخل صفحة auth
  return true;
};

