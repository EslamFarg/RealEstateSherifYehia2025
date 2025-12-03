import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../services/basehttpservices.service';
// import { BasehttpservicesService } from '.shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BasehttpservicesService{


  CreateGroup(data:any){
    return this.post('/Groups/AddGroup',data);
  }


  getAllDataGroup(pagination:any){
    return this.get(`/Groups?${pagination}`);
  }


  getDataUpdate(id:any){
    return this.get(`/Groups/${id}`);
  }


  updateData(data:any){
    return this.put(`/Groups/UpdateGroup`,data);
  }


  deleteData(id:any){

    return this.delete(`/Groups/${id}`);
  }

}
