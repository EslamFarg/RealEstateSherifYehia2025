import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesettingsService extends BasehttpservicesService{



  sendMessageSettings(data:any){
    return this.post('/MessagingSettings',data)
  }


  getAllDataUpdate(){
    return this.get('/MessagingSettings')
  }

}
