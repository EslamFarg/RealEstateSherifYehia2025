import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class ClassificationapartmentService extends BasehttpservicesService {

  // constructor() { }




  createUnitCategories(data:any){
    return this.post('/UnitCategories/create',data);
  }


  getAllDataUnitCategories1(pagination:any){
    return this.post('/UnitCategories',pagination);
  }

  getUpdateData(id:any){
    return this.get(`/UnitCategories/${id}`);
  }


  updateData(data:any){
    return this.put(`/UnitCategories/update`,data);

  }

  deleteData(id:any){
    return this.delete(`/UnitCategories/${id}`);
  }

}
