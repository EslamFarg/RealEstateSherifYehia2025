import { Injectable } from '@angular/core';
import { BasehttpservicesService } from '../../../../../shared/services/basehttpservices.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends BasehttpservicesService{

  // constructor() { }




  createData(data:any){
    return this.post(`/Employees/create`,data)
  }


  getAllDataEmployees(pagination:any){
    return this.post(`/Employees`,pagination)
  }


  getUpdateDate(id:any){
    return this.get(`/Employees/${id}`)
  }

  updateData(data:any){
    return this.put(`/Employees/update`,data)
  }


  deleteData(id:any){
    return this.delete(`/Employees/${id}`)
  }


}
