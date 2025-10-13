import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environment/environment.prod';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';
import { Observable } from 'rxjs';
import { Newuser } from '../models/newuser';

@Injectable({
  providedIn: 'root'
})
export class NewuserService extends BasehttpservicesService{





  


  addNewUser(data:any){
  return this.post(`/Users`,data);
  }


  getAllDataUser():Observable<Newuser>{
    return this.get<Newuser>(`/Users`);
  }


  getDataUpdate(id:any){
    return this.get<Newuser>(`/Users/${id}`)
  }


  UpdateData(data:any){
    return this.put(`/Users`,data)
  }


  deleteData(id:any){

    return this.delete(`/Users/${id}`)

  }
}
