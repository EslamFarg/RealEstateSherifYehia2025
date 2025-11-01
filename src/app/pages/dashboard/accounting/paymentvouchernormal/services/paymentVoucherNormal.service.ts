import { Injectable } from "@angular/core";
import { BasehttpservicesService } from "../../../../../shared/services/basehttpservices.service";

@Injectable({
    providedIn: 'root'

})



export class PaymentVoucherNormalService extends BasehttpservicesService{


     createpaymentVoucher(data: any) {
        return this.post('/PaymentVoucher/Create', data);
    }


    getAllDataPaymentVoucher(pagination:any){
        return this.post(`/PaymentVoucher/GetList`,pagination);
    }


    deleteData(id:any){
        return this.delete(`/PaymentVoucher/${id}`);

    }


    getDataUpdate(id:any){

        return this.get(`/PaymentVoucher/${id}`);

    }

    updateData(data:any){
        return this.put(`/PaymentVoucher/Update`,data);
    }
    // onSubmit
}