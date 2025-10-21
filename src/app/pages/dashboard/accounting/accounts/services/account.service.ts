import { Injectable } from "@angular/core";
import { BasehttpservicesService } from "../../../../../shared/services/basehttpservices.service";

@Injectable({
    providedIn: 'root'
})


export class AccountService extends BasehttpservicesService{
    // constructor() { }



    createData(data:any){
        return this.post(`/Accounts/create`,data)
    }

    getAllData(pagination:any){
        return this.post(`/Accounts`,pagination)
    }

    getDataUpdate(id:any){
        return this.get(`/Accounts/${id}`)
    }

    updateData(data:any){
        return this.put(`/Accounts/update`,data)
    }

    deleteData(id:any){
        return this.delete(`/Accounts/${id}`)
    }
}