import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from '../../ui/toastr/services/toastr.service';
import { DirectivesModule } from "../../directives/directives.module";
import { TitleMsgPopupComponent } from '../../ui/title-msg-popup/title-msg-popup.component';
import { SendsmsComponent } from "../sendsms/sendsms.component";
import { SendwhatappComponent } from "../sendwhatapp/sendwhatapp.component";
import { SendemailComponent } from "../sendemail/sendemail.component";

@Component({
  selector: 'app-sendsingularmessage',
  templateUrl: './sendsingularmessage.component.html',
  styleUrl: './sendsingularmessage.component.scss',
  standalone:true,
  imports: [NgbNavModule, FormsModule, TitleMsgPopupComponent, SendsmsComponent, SendwhatappComponent, SendemailComponent]
})
export class SendsingularmessageComponent {
active = 1;
active2=1
msgDataDescription1:any
showPopup=false;
searchdataCheckRealtor:any=[];

showPopupRealtor=false
 cdr:ChangeDetectorRef=inject(ChangeDetectorRef)

 toastr:ToastrService=inject(ToastrService)
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
