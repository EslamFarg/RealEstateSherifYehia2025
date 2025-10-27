import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';
import { Observable } from 'rxjs';
import { Owner } from '../models/owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerService extends BasehttpservicesService{





  createOwner(data:any){
    return this.post('/Owners/create',data);
  }


  getAllDataOwner(pagination:any):Observable<Owner>{
    return this.post<Owner>('/Owners',pagination);
  }

  getDataUpdate(id:any){
    return this.get(`/Owners/${id}`)
  }


  updateData(query:any,fileData:any){
    return this.put(`/Owners/update?${query}`,fileData);
  }


  deleteData(id:any){

    return this.delete(`/Owners/${id}`);

  }




  
}
