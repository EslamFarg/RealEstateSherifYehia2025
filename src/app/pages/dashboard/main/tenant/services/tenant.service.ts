import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class TenantService extends BasehttpservicesService{




  createTenant(data:any){
    return this.post(`/Tenants/create`,data);
  }


  getAllDataTenant(pagination:any){
    return this.post('/Tenants',pagination);
  }


  getDataUpdate(id:any){
    return this.get(`/Tenants/${id}`)
  }


  updateData(data:any){
    return this.put(`/Tenants/update`,data)
  }
  

  deleteData(id:any){
    return this.delete(`/Tenants/${id}`)
  }


  searchData(data:any){
    return this.post(`/Tenants/search`,data)

  }
  
}
