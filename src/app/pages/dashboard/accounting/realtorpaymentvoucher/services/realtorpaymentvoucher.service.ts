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

      createBrokerPaymentVoucher(data:any){
        return this.post('/BrokerPaymentVoucher/Create',data);
      }

      updateBrokerPaymentVoucher(data:any){
        return this.put('/BrokerPaymentVoucher/Update',data);
      }


      getByIdBrokerPaymentVoucher(id:any){
        return this.post(`/BrokerPaymentVoucher/GetById?Id=${id}`,{});
      }

      deleteDataBrokerPaymentVoucher(id:any){
        return this.delete(`/BrokerPaymentVoucher/Delete?id=${id}`);
      }

      getAllDataBroker(pagination:any){
        return this.post('/BrokerPaymentVoucher/GetAll',pagination);
      }

      filterSearch(data:any){

        return this.post('/BrokerPaymentVoucher/Filter',data);

      }
}