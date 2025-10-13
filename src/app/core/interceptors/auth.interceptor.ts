import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../shared/services/loading.service';
import { finalize } from 'rxjs';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoadingService)
 const storedData = localStorage.getItem('payloadUser');
  let token = null;

  try {
    if (storedData) {
      const parsed = JSON.parse(storedData);
      token = parsed?.token || null;
    }
  } catch (error) {
    console.error('Invalid JSON in payloadUser', error);
  }

  let authReq = req;
  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  loader.show();
  return next(authReq).pipe(
    finalize(() => {
      loader.hide();
    })
  );
};
