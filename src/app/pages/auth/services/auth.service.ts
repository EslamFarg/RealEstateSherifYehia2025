import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthLogin } from '../models/auth';
import { BasehttpservicesService } from '../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BasehttpservicesService{






  authLogin(data:any) {
    return this.post(`/Auths/Login`,data);
  }



  sendEmailInotp(data:any){

    return this.post(`/Auths/ForgetPasswordAndEmailConfirmed`,data);

  }


  sendOtp(data:any){

    return this.post(`/Auths/ValidOtp`,data);

  }
  

  changePassword(data:any){

    return this.post(`/Auths/ChangePassword`,data);

  }
}
