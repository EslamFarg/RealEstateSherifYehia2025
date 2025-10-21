import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sendsingularmessage',
  templateUrl: './sendsingularmessage.component.html',
  styleUrl: './sendsingularmessage.component.scss',
  standalone:true,
  imports:[NgbNavModule,FormsModule]
})
export class SendsingularmessageComponent {
active = 1;
active2=1
msgDataDescription1:any
showPopup=false;
searchdataCheckRealtor:any=[];

showPopupRealtor=false
 cdr:ChangeDetectorRef=inject(ChangeDetectorRef)
arrDataCheck(val:any){

  this.searchdataCheckRealtor=val;


  console.log(this.searchdataCheckRealtor);

}


deleteTenant(index:any){
this.searchdataCheckRealtor.splice(index,1)
}


showMsg(val:any){
  // setTimeout(()=>{
 this.msgDataDescription1=val;
  // },0)
 this.cdr.detectChanges(); // 👈 يجبر Angular يعمل تحديث للتبويبات

  // console.log(this.msgDataDescription);
 

}
}
