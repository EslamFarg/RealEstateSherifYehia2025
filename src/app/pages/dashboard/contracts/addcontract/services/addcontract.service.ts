import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class AddcontractService extends BasehttpservicesService {

  // constructor() { }


  searchByUnit(data:any){
   return this.post(`/Units/search`,data)
  }

  searchByTenant(data:any){
    return this.post(`/Tenants/search`,data)

  }

  searchByBroker(data:any){
    return this.post(`/Brokers/search`,data)
  }


  getTaxes(){
    return this.get('/SystemSettings/Tax');
  }

  createContract(data:any){
    return this.post('/Contracts/create',data)
  }

  updateContract(data:any){
    return this.put('/Contracts/update',data)
  }

  deleteContract(id:any){
    return this.delete(`/Contracts/${id}`)

  }

  getAllDataContracts(pagination:any){
    return this.post('/Contracts',pagination);
  }


  searchByContract(data:any){
    return this.post('/Contracts/search',data);
  }

  getDataById(id:any){
    return this.get(`/Contracts/${id}`);
  }
}
