import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class TypemaintenanceService  extends BasehttpservicesService{

  // constructor() { }\

  



  createMaintenance(data:any){
    return this.post(`/MaintenanceTypes/create`,data);
  }

  getAllDataMaintenance(pagination:any){
    return this.post(`/MaintenanceTypes`,pagination);
  }

  getDataUpdate(id:any){
    return this.get(`/MaintenanceTypes/${id}`);
  }

  updateData(data:any){
    return this.put(`/MaintenanceTypes/update`,data);
  }


  deleteData(id:any){
    return this.delete(`/MaintenanceTypes/${id}`);
  }
  
}
