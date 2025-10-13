import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilesettingsService extends BasehttpservicesService {

  // constructor() { }



  getDataUserProfile(){
    return this.post('/UserIdentity/GetUserProfile',{});
  }



  changePassword(data:any){
    return this.post('/UserIdentity/ChangePassword',data);
  }
}
