import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class MessageformsService extends BasehttpservicesService{

  // constructor() { }




  createMessage(data:any){
    return this.post(`/MessageTemplate`,data)

  }


  getAllDataMessageForms(page:any,size:any){
    return this.get(`/MessageTemplate?page=${page}&pageSize=${size}`);

  }

  getDataUpdate(id:any){
    return this.get(`/MessageTemplate/${id}`)
  }

  updateData(data:any){
    // /MessageTemplate
    return this.put(`/MessageTemplate`,data)
  }

  deleteData(id:any){
    return this.delete(`/MessageTemplate/${id}`)
  }
}
