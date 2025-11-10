import { Inject, Injectable } from "@angular/core";
import { BasehttpservicesService } from "../../../services/basehttpservices.service";

@Injectable({
    providedIn:'root'
})
export class SearchinformsService extends BasehttpservicesService{
    // constructor() {}



    getAllDataUsers(){
        return this.get('/Users');
    }
}