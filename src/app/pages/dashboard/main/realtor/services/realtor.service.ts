import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class RealtorService  extends BasehttpservicesService{






  createRelator(data: any) {
    return this.post(`/Brokers/create`, data);
  }

  getAllDataRealtor(pagination:any){
    return this.post('/Brokers',pagination)
  }

  getDataUpdate(id:any){

    return this.get(`/Brokers/${id}`,)

  }


  updateData(query:any,dataFile:any){
    return this.put(`/Brokers/update?${query}`,dataFile)

  }


  deleteData(id:any){
    return this.delete(`/Brokers/${id}`);
  }

}
