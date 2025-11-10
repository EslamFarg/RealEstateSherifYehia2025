import { Injectable } from "@angular/core";
import { BasehttpservicesService } from "../../../../../shared/services/basehttpservices.service";

@Injectable({
    providedIn: 'root'
})


export class TerminationcontractService  extends BasehttpservicesService{




    GetRefund(contractId:any,endMonthIndex:any,endYear:any){
        return this.post(`/Contracts/GetRefund?contractId=${contractId}&endMonthIndex=${endMonthIndex}&endYear=${endYear}`,{});
    }



    // accountingEntries(data:any){
    //     return this.post(`/Accounting/Entries`,data);
    // }


    createRefund(data:any){
        return this.post(`/Contracts/CreateRefund`,data);
    }

}