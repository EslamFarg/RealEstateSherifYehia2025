import { Injectable } from "@angular/core";
import { BasehttpservicesService } from "../../../../../shared/services/basehttpservices.service";

@Injectable({
    providedIn: 'root'
})

export class AccountstatementService extends BasehttpservicesService {

    getAllaccountsfinancially(pagination:any){
        return this.post(`/FinancialAccount/GetList`,pagination);
    }


    searchAccountsEstatement(data:any){
        return this.post(`/AccountStatement/GetAccountStatements`,data)
    }

}