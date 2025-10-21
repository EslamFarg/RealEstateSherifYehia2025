import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditBehaviorServiceService {

  private idsource=new BehaviorSubject(null);
  idSubscribe=this.idsource.asObservable();


  setId(id:any){
    return this.idsource.next(id)
  }


  clearId(){
    return this.idsource.next(null)
  }


  

}
