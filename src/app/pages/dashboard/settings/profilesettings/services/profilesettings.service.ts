import { inject, Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilesettingsService extends BasehttpservicesService {

  // constructor() { }

  http1:HttpClient=inject(HttpClient)


  getDataUserProfile(){
    return this.post('/UserIdentity/GetUserProfile',{});
  }


  EditUserData(data:any){
    return this.post('/UserIdentity/EditUserData',data);
  }


  changePassword(data:any){
    return this.post('/UserIdentity/ChangePassword',data);
  }


  EditProfileImg(data:any){
    return this.http1.post(`${environment.apiUrl}/UserIdentity/EditImgProfile`,data,{ responseType: 'text' } );
  }


  editChangeEmail(data:any){
    return this.post('/UserIdentity/change-email',data);
  }
  
  // getAllDataUsers(){
  //   return this.post('/UserIdentity/GetUserProfile',{})
  // }
}
