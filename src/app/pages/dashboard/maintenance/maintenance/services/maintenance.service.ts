import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService extends BasehttpservicesService{



  createData(data:any){
    return this.post(`/Maintenance/create`,data)
  }



  searchData(data:any){
    return this.post(`/Maintenances/search`,data)
  }
  
  searchByUnit(data:any){
    return this.post(`/Units/search`,data)
  }
  searchByProperty(data:any){
    return this.post(`/Properties/search`,data)
  }


}
