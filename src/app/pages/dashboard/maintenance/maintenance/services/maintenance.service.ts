import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService extends BasehttpservicesService{



  createData(data:any){
    return this.post(`/Maintenances/create`,data)
  }

  getAllDataMaintenaces(pagination:any){
    return this.post(`/Maintenances`,pagination);
  }

  updateData(data:any){
    return this.put(`/Maintenances/update`,data)
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


  deleteData(id:any){
    return this.delete(`/Maintenances/${id}`)

  }



  getDataUpdate(data:any){
    return this.post(`/Maintenances/search`,data);

  }
}
