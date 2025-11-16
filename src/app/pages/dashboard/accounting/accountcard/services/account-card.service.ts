import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class AccountCardService extends BasehttpservicesService{

  // /FinancialAccount/GetList
  getFinancialAccountList(payload: any) {
    return this.post(`/FinancialAccount/GetList` , payload);
  }

  // /FinancialAccount/Create
  createFinancialAccount(payload: any) {
    return this.post(`/FinancialAccount/Create` , payload);
  }
  // /FinancialAccount/GetById?id=1
  getFinancialAccountById(id:number) {
    return this.get(`/FinancialAccount/GetById?id=${id}`);
  }
  // /FinancialAccount/Update
  updateFinancialAccount(payload: any) {
    return this.post(`/FinancialAccount/Update` , payload);
  }
}
