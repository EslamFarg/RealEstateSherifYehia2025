import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService extends BasehttpservicesService{

  // constructor() { }


    getAllDataGroup(pagination:any){
    return this.get(`/Groups?${pagination}`);
  }



  getAllPages(){
    return this.get('/Pages/GetAllWithActions?PageIndex=0&PageSize=0');
  }



  addPermissions(data:any){
    return this.post('/GroupActions/AddPermission',data);
  }
}
