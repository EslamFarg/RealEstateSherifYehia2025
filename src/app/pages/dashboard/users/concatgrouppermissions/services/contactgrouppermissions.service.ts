import { Injectable } from "@angular/core";
import { BasehttpservicesService } from "../../../../../shared/services/basehttpservices.service";

@Injectable({
    providedIn: 'root'
})


export class ConcatgrouppermissionsService extends BasehttpservicesService{
    // constructor() { }


  getAllDataGroup(pagination:any){
    return this.get(`/Groups?${pagination}`);
  }


  getPermissionsbyPagesId(id:any){
    return this.get(`/PageActions/GetActionsByPageIdAsync/${id}`);
  }


  addPermission(data:any){
    return this.post(`/GroupActions/AddPermission`,data);
  }
}