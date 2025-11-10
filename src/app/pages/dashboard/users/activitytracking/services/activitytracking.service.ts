import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitytrackingService extends BasehttpservicesService {

  // constructor() { }



  searchUser(searchData:any){
    return this.get(`/Users/Search?search=${searchData}`);
  }

  logs(data:any){
    return this.post('/Logs',data);
  }
}
