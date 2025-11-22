import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../shared/services/loading.service';
import { finalize } from 'rxjs';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const loader = inject(LoadingService)
//  const storedData = localStorage.getItem('payloadUser');
//   let token = null;

//   try {
//     if (storedData) {
//       const parsed = JSON.parse(storedData);
//       token = parsed?.token || null;
//     }
//   } catch (error) {
//     console.error('Invalid JSON in payloadUser', error);
//   }

//   let authReq = req;
//   if (token) {
//     authReq = req.clone({
//       headers: req.headers.set('Authorization', `Bearer ${token}`)
//     });
//   }

//   loader.show();
//   return next(authReq).pipe(
//     finalize(() => {
//       loader.hide();
//     })
//   );

  const loader = inject(LoadingService);
  let token: string | null = null;

  try {
    const storedData = localStorage.getItem('payloadUser');

    // ✅ تأكد إنها مش null أو undefined كنص
    if (storedData && storedData !== 'undefined' && storedData !== 'null') {
      const parsed = JSON.parse(storedData);
      token = parsed?.token ?? null;
    }
  } catch (error) {
    console.warn('⚠️ Invalid JSON in payloadUser:', error);
  }

  // 🧾 نضيف الهيدر لو في توكن
  const authReq = token
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
    : req;

     const skipLoader = authReq.headers.has('skipLoader');

  if (skipLoader) {
    return next(authReq); // بدون لودر
  }
  // 🎬 إظهار اللودر
  loader.show();

  return next(authReq).pipe(
    finalize(() => {
      loader.hide();
    })
  );
};
