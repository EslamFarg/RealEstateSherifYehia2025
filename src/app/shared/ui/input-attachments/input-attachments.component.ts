import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
  @Output() sendDataFiles=new EventEmitter()


  @Input() nameFiles:any=[];
  rejectedFiles: string[] = []; // أسماء الملفات المرفوضة




  ngOnInit(){
  // console.log()
  }

  onSelectFiles(e:any){
    const files=e.target.files;

        const AllowType=['doc','docx','jpg','jpeg','png','gif','pdf']

    

 
    
    for(let i = 0 ; i< files.length; i++){


      const ext=files[i].name.split('.').pop().toLowerCase();
      console.log()

      if(ext && AllowType.includes(ext)){
       this.nameFiles.push(files[i]);    
       this.sendDataFiles.emit(this.nameFiles)
      }else{
        this.rejectedFiles.push(files[i].name); // حفظ أسماء الملفات المرفوضة
      }
     
    }


    if(this.rejectedFiles.length > 0){
          const rejectedNames = this.rejectedFiles.join(', ');
          this.toastr.show(`يحتوي على ملفات غير مسموح بها ${rejectedNames}`,'error');
    }


  }





  showAttachments(){
    if(this.nameFiles.length > 0){

  


      
      this.showPopupAttachment=true;
      console.log(this.nameFiles);
    }else{
      this.showPopupAttachment=false;
      this.toastr.show('رجاء اختيار ملف','error');
    }
  }


  
}
