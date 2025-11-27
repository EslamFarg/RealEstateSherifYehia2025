import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService extends BasehttpservicesService{

  // constructor() { }




  getAllPages(){
    return this.get('/pages?PageIndex=0&PageSize=0');
  }
}
