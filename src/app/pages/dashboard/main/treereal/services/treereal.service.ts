import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class TreerealService extends BasehttpservicesService{

  // constructor() { }


  getDataPropertyTree(search:any){
    return this.post('/Properties/GetPropertyTree',search)
  }

  getDataUnitById(id:any){
    return this.get('/Units/'+id)
  }
}
