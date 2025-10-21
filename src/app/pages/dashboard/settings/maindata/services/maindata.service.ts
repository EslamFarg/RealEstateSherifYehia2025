import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class MaindataService extends BasehttpservicesService{

  // constructor() { }




  createSystemSettings(data:any){

    return this.http.post('/SystemSettings/Setting',data)

  }

}
