import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class SendmessageService extends BasehttpservicesService{

  sendDataMessageGroup(data:any){
    return this.post(`/MessageSender/SendBulkMessage`,data)
  }

  getAllDataMessagesListgroup(page:any,pageSize:any){
    return this.get(`/MessageSender/ListGroup?${page}&${pageSize}`);
  }


  getByProperty(data:any){
    return this.post(`/Properties/search`,data)
  }



  getAndPropertyByTenant(id:any,pagination:any){
    return this.post(`/Tenants/searchByPropertyId?propertyId=${id}`,pagination);
  }


searchByTenant(searchVal: any,Page:any,PageSize:any) {
  return this.get(`/MessageSender/ListGroup?Search=${searchVal}&Page=${Page}&PageSize=${PageSize}`);
}


redirectSearch(id:any){
  return this.get('/MessageSender/'+id);
}

}
