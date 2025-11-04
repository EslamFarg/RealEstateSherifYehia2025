import { Injectable } from "@angular/core";
import { BasehttpservicesService } from "../../../../../shared/services/basehttpservices.service";


@Injectable({
    providedIn: 'root'
})
export class paymentreceiptvoucherService extends BasehttpservicesService {
    // constructor() { }




    searchContracts(data:any){

        return this.post(`/Contracts/search`,data);

    }


    getAllMonths(contractId:any){
        return this.post(`/Contracts/GetInstallmentForTenant?contractId=${contractId}`,{});
    }

    createData(data:any){
        return this.post(`/TenantReceiptVoucher`,data);
    }

    updateData(data:any){

        return this.put(`/TenantReceiptVoucher/Update`,data);

    }


    getAllData(pagination:any){
        return this.post(`/TenantReceiptVoucher/GetList`,pagination);
    }

    searchFilter(data:any){
        return this.post(`/TenantReceiptVoucher/Filter`,data);
    }


    searchById(id:any){
        return this.get(`/TenantReceiptVoucher/GetById?id=${id}`);
    }

    deleteData(id:any){
        return this.delete(`/TenantReceiptVoucher/Delete?id=${id}`);
    }
}