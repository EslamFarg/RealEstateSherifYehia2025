import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerpaymentvoucherService extends BasehttpservicesService{

  // constructor() { }



  getAllDataOwnerPaymentVoucher(pagination:any){
    return this.post(`/OwnerPaymentVoucher/GetList`,pagination)
  }

  searchOwner(shapeSearch:any){
    return this.post(`/Owners/search`,shapeSearch);
  }

  getDatailsContracts(id:any,pagination:any){
    return this.post(`/Owners/GetInstallment?ownerId=${id}`,pagination);

  }

  filterDatailsOwner(data:any){
    return this.post(`/OwnerPaymentVoucher/Filter`,data);
  }


  getDataTaxes(){
    return this.get(`/SystemSettings/Tax`);
  }

  deleteData(id:any){
    return this.delete(`/OwnerPaymentVoucher/${id}`);
  }


  createOwnerPaymentVoucher(data:any){
    return this.post(`/OwnerPaymentVoucher`,data);
  }

  updateOwnerPaymentVoucher(data:any){
    return this.put(`/OwnerPaymentVoucher/Update`,data);
  }

  getDataById(id:any){
    return this.get(`/OwnerPaymentVoucher/GetById?id=${id}`);
  }

  
}
