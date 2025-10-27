import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService extends BasehttpservicesService{

  // constructor() { }



  createApartment(data: any) {
    return this.post(`/Units/create`, data);
  }


  updateData(data:any){
    return this.put(`/Units/update`,data);
  }

  searchDataUnitNumber(data:any){
    return this.post(`/Units/search`,data);

  }

  deleteData(id:any){
    return this.delete(`/Units/${id}`)
  }

  getAllDataUnit(pagination:any){
    return this.post(`/Units`,pagination);

  }

  getDataUpdate(id:any){
    return this.get(`/Units/${id}`);
  }

  searchDataUnit(data:any){
    return this.post(`/Units/search`,data);
  }
}
