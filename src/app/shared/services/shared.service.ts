import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import cities from '../../../../public/api/cities_lite.json';
import districts from '../../../../public/api/districts_lite.json';
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





  allCities=cities
  allDistricts=districts


}
