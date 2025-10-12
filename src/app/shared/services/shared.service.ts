import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

   http:HttpClient=inject(HttpClient);

  getAllNationality(){
    return this.http.get('/api/nationalities.json');
  }


  getAllRelations(){
    return this.http.get('/api/relations.json');
  }
}
