import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasehttpservicesService {



  http:HttpClient=inject(HttpClient);

  apiUrl=environment.apiUrl;

  
  get<T>(endPoint:string){
    return this.http.get<T>(`${this.apiUrl}${endPoint}`);
  }

  post<T>(endPoint:string,data:any){
    return this.http.post<T>(`${this.apiUrl}${endPoint}`,data);
  }


  put<T>(endPoint:string,data:any){
    return this.http.put<T>(`${this.apiUrl}${endPoint}`,data);
  }

  delete<T>(endpoint: string) {
  return this.http.delete<T>(`${this.apiUrl}/${endpoint}`);
  }


}
