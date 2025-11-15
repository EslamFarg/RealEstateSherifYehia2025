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
  
}