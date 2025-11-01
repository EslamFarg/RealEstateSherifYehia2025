import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class SalifsService extends BasehttpservicesService{





  createPaymentVoucher(data:any){
    return this.post('/EmployeePaymentVoucher/Create',data);
  }


  updatePaymentVoucher(data:any){
    return this.put('/EmployeePaymentVoucher/Update',data);
  }


  deleteData(id:any){
    return this.delete(`/EmployeePaymentVoucher/Delete?id=${id}`);
  }



  getAllData(pagination:any){
    return this.post('/EmployeePaymentVoucher/GetAll',pagination);
  }


  searchData(data:any){
    return this.post(`/EmployeePaymentVoucher/Filter`,data);
  }

  getDataById(id:any){
    return this.post(`/EmployeePaymentVoucher/GetById?id=${id}`,{});

  }
}
