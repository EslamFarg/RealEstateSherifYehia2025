import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from '../../shared/ui/toastr/services/toastr.service';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let errorMsg = 'حدث خطأ غير متوقع، يرجى المحاولة لاحقًا.';

      if (err.error instanceof ErrorEvent) {
       
        // Error من جهة العميل (مشكلة في الاتصال)
        errorMsg = `خطأ في الاتصال: ${err.error.message}`;

      
      } else {

       

        if (err.error.errors && err.error.errors.length > 0 && Array.isArray(err.error.errors)) {



       err.error.errors.forEach((error:any) => {
            const message = error.detail;
            

            toastr.show(message, 'error');
          });
        }else   if (err.error?.errors && typeof err.error.errors === 'object' && !Array.isArray(err.error.errors)) {
          // كل حقل يمكن أن يحتوي على مصفوفة من الرسائل
          for (const field in err.error.errors) {
            if (Array.isArray(err.error.errors[field])) {
              err.error.errors[field].forEach((message: string) => {
                toastr.show(` ${message}`, 'error');
              });
            }
          }
        } 
        else if(err.error?.detail){
              errorMsg = err.error.detail;   
               toastr.show(errorMsg, 'error');       
        } 
        
        else if (err.error?.message) {
          errorMsg = err.error.message;
          toastr.show(errorMsg, 'error');
        }
        
        else {
          // لو مافيش code أو message، نستخدم switch على status
          switch (err.status) {
            case 400:
              errorMsg = 'طلب غير صحيح (Bad Request)';
              break;
            case 401:
              errorMsg = 'غير مصرح لك بالدخول. يرجى تسجيل الدخول.';
              break;
            case 403:
              errorMsg = 'ليس لديك صلاحية للوصول إلى هذا المورد.';
              break;
            case 404:
              errorMsg = 'العنصر المطلوب غير موجود.';
              break;
            case 500:
              errorMsg = 'خطأ داخلي في الخادم.';
              break;
            default:
              errorMsg = `حدث خطأ رقم ${err.status}`;
          }
        }
      }
      // ✅ عرض الرسالة في التوستر
      // toastr.show(errorMsg, 'error');

      // ✅ ارجع الخطأ بشكل سليم لـ RxJS
      return throwError(() => err);
    })
  );
};
