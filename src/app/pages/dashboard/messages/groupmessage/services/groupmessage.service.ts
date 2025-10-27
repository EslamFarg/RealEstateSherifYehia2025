import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class GroupmessageService extends BasehttpservicesService {

  // constructor() { }


  searchMessage(params:any){
    return this.get(`/MessageSender/ListSingle?${params}`)
  }
}
