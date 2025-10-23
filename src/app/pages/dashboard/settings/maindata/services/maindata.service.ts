import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class MaindataService extends BasehttpservicesService{

  // constructor() { }




  createSystemSettings(data:any){

    return this.post('/SystemSettings/Setting',data)

  }

  getDataSystemSettings(){

    return this.get('/SystemSettings/Settings')
  }


  createSystemTerms(data:any){
    return this.post('/SystemSettings/Terms',data);
  }


  getDataSystemTerms(){

    return this.get('/SystemSettings/Terms')
  }
}
