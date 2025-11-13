import { Injectable } from "@angular/core";
import { BasehttpservicesService } from "../../../../../shared/services/basehttpservices.service";

@Injectable({
    providedIn: "root",
})
export class LinkpagepermissionsService extends BasehttpservicesService {



    addPagePermission(data:any) {
    return this.post(`/PageActions/AddPageAction`,data);
    }


    getAllDataPagePermission(PageIndex:any,PageSize:any){
        return this.get(`/PageActions?PageIndex=${PageIndex}&PageSize=${PageSize}`)

    }

    getDatapageActionsById(id:any){
        return this.get(`/PageActions/${id}`)
    }


    updateDataPageActionsById(data:any){
        return this.put(`/PageActions/UpdatePageAction`,data);

    }

    deleteData(id:any){
       return this.delete(`/PageActions/${id}`)
    }
}