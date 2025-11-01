import { Injectable } from "@angular/core";
import { BasehttpservicesService } from "../../../../../shared/services/basehttpservices.service";


@Injectable({
    providedIn: 'root'
})


export class RealtorpaymentvoucherService extends BasehttpservicesService{
    // constructor() { }




    searchBroker(data: any) {
        return this.post('/Brokers/search', data);
      }

      searchBrokerCommissions(id:any,pagination:any){
        return this.post(`/Brokers/GetCommissions?brokerId=${id}`,pagination);
      }


      getAllDataRealtorPaymentVoucher(pagination:any){
        return this.post('/BrokerPaymentVoucher/GetAll',pagination);


      }
}