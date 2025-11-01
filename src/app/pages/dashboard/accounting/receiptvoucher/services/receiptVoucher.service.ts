import { Inject, Injectable } from "@angular/core";
import { BasehttpservicesService } from "../../../../../shared/services/basehttpservices.service";

@Injectable({
    providedIn: 'root'
})
export class ReceiptVoucherService extends BasehttpservicesService {
    // constructor() {}



    createreceiptVoucher(data: any) {
        return this.post('/ReceiptVoucher/Create', data);
    }

    getAllReceiptVoucher(pagination:any) {
        return this.post('/ReceiptVoucher/List', pagination);

    }


    getAllFinancialAccount(){
        return this.post('/FinancialAccount/GetList',{});
    }


    getDataUpdate(id:any){
        return this.get(`/ReceiptVoucher/${id}`)
    }


    updateDate(data:any){

        return this.put(`/ReceiptVoucher/Update`,data);

    }


    deleteData(id:any){
        return this.delete(`/ReceiptVoucher/${id}`);

    }
    
}