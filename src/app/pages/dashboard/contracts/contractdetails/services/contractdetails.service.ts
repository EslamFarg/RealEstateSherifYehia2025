import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class ContractdetailsService extends BasehttpservicesService{


  filterSearchContract(data:any){
    return this.post('/Contracts/search',data);
  }

  getAllDataContract(pagination:any){
    return this.post('/Contracts',pagination);
  }
}
