import { Component, inject, Input } from '@angular/core';
import { PopupAttachmentsComponent } from '../popup-attachments/popup-attachments.component';
import { ToastrService } from '../toastr/services/toastr.service';
import { ToastrComponent } from "../toastr/toastr.component";
// import { ToastrComponent } from '../toastr/toastr.component';

@Component({
  selector: 'app-input-attachments',
  templateUrl: './input-attachments.component.html',
  styleUrl: './input-attachments.component.scss',
  imports: [PopupAttachmentsComponent, ToastrComponent],
  standalone:true,
})
export class InputAttachmentsComponent {

  showPopupAttachment=false
  toastr:ToastrService=inject(ToastrService);



  nameFiles:any=[];



  ngOnInit(){
  // console.log()
  }

  onSelectFiles(e:any){
    const files=e.target.files;
    for(let i = 0 ; i< files.length; i++){
      this.nameFiles.push(files[i]); 
    }


  }



  showAttachments(){
    if(this.nameFiles.length>0){
      this.showPopupAttachment=true;
      console.log(this.nameFiles);
    }else{
      this.showPopupAttachment=false;
      this.toastr.show('رجاء اختيار ملف','error');
    }
  }
}
