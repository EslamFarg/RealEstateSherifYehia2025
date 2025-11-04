import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import cities from '../../../../public/api/cities_lite.json';
import districts from '../../../../public/api/districts_lite.json';
import regions from "../../../../public/api/regions_lite.json"
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  http: HttpClient = inject(HttpClient);

  getAllNationality() {
    return this.http.get('/api/nationalities.json');
  }

  getAllRelations() {
    return this.http.get('/api/relations.json');
  }



    getAllfinancialData(pagination:any){
    return this.http.post(environment.apiUrl+'/FinancialAccount/GetList',pagination)
  }


  allCities=cities
  allDistricts=districts
  allRegions=regions


}
