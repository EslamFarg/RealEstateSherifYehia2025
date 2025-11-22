import { inject, Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilesettingsService extends BasehttpservicesService {
  // constructor() { }

  http1: HttpClient = inject(HttpClient);

  getDataUserProfile() {
    return this.post('/UserIdentity/GetUserProfile', {});
  }

  EditUserData(data: any) {
    return this.post('/UserIdentity/EditUserData', data);
  }

  changePassword(data: any) {
    return this.post('/UserIdentity/ChangePassword', data);
  }

  EditProfileImg(data: FormData): Observable<HttpEvent<any>> {
    return this.http1.post(
      `${environment.apiUrl}/UserIdentity/EditImgProfile`,
      data,
      {
        reportProgress: true,
        observe: 'events',
        headers: {
          skipLoader: 'true',
        },
        responseType: 'text' as 'json',
      }
    );
  }

  editChangeEmail(data: any) {
    return this.post('/UserIdentity/change-email', data);
  }

  // getAllDataUsers(){
  //   return this.post('/UserIdentity/GetUserProfile',{})
  // }
}
