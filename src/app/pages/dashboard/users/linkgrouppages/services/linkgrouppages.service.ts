import { Inject, Injectable } from "@angular/core";
import { BasehttpservicesService } from "../../../../../shared/services/basehttpservices.service";

@Injectable({
    providedIn: 'root'
})
export class LinkgrouppagesService extends BasehttpservicesService {
    // constructor() { }




    addPageAndGroup(data: any) {
        return this.post('/PageGroups/AddPageGroup', data);
    }


    getAllDatagroupPages(pageIndex:any,pageSize:any) {
        return this.get(`/PageGroups?PageIndex=${pageIndex}&PageSize=${pageSize}`);
    }


    getDataById(id:any){
        return this.get(`/PageGroups/${id}`);
    }



    updatePageAndGroup(data: any) {
        return this.put('/PageGroups/UpdatePageGroup', data);
    }


    deleteData(id:any){
        return this.delete(`/PageGroups/${id}`)
    }
    
}