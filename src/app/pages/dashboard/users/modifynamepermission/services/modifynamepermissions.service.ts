import { Injectable } from "@angular/core";
import { BasehttpservicesService } from "../../../../../shared/services/basehttpservices.service";

@Injectable({
    providedIn: 'root'
})

export class ModifynamepermissionsService extends BasehttpservicesService{
    


    getAllPermissions(pageIndex:any,pageSize:any){
        return this.get(`/Actions?PageIndex=${pageIndex}&PageSize=${pageSize}`)
      }
 }