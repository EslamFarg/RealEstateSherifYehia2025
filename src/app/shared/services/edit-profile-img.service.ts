import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditProfileImgService {
  
  payloadUser=JSON.parse(localStorage.getItem('payloadUser')!);
  editBehavior = new BehaviorSubject<any>(this.payloadUser.imgUrl);
  editObs=this.editBehavior.asObservable()
  // constructor() { }



  // payloadUser.imgUrl=this.editBehavior.asObservable();


  editImg(img:any){
    this.editBehavior.next(img);
  }


  clearImg(){
    this.editBehavior.next(null);
  }

}
