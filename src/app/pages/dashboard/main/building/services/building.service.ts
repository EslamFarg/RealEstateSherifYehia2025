import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class BuildingService extends BasehttpservicesService{


  // constructor() { }



  createProperty(formData:any){
    return this.post(`/Properties/create`,formData)
  }


  getAllDataBuilding(pagination:any){
    return this.post(`/Properties`,pagination);
  }


  getDataUpdate(id:any){
    return this.get('/Properties/'+id);
  }


  updateData(formData:any){

    return this.put(`/Properties/update`,formData);

  }

  deleteData(id:any){
    return this.delete(`/Properties/${id}`)
  }
}
