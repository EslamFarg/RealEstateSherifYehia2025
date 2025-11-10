import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class SalaryDisbursementService extends BasehttpservicesService{

  // constructor() { }



  createPayrollVoucher(data: any) {

    return this.post('/PayrollVoucher/Create',data);

  }


  getEmployeespayrollVoucher(month:any,year:any) {


    return this.post('/Employees/GetEmployeePayroll?month='+month+'&year='+year+'',{})

  }


  getByIdPayrollVoucher(id:any){
    return this.post('/PayrollVoucher/GetById?id='+id+'',{})
  }

  deletePayrollVoucher(id:any){
    return this.delete('/PayrollVoucher/Delete?id='+id+'')
  }


  getAllData(pagination:any){
    return this.post('/PayrollVoucher/GetAll',pagination)

  }

  searchData(data:any){
    return this.post('/PayrollVoucher/Filter',data)
  }
}
