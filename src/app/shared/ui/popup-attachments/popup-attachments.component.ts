import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup-attachments',
  templateUrl: './popup-attachments.component.html',
  styleUrl: './popup-attachments.component.scss',
  standalone:true,
  imports:[NgClass]
})
export class PopupAttachmentsComponent {


  @Input() showPopupAttachment:any;

  @Input() dataFile:any=[];

  @Output() closeAttachments=new EventEmitter();
  @Output() idRemoveFiles=new EventEmitter();

  onClose(){
    this.closeAttachments.emit(!this.showPopupAttachment);
    
  }



  hideFile(i:any,id:any){
    this.dataFile.splice(i,1);
    this.idRemoveFiles.emit(id);
    if(this.dataFile.length==0){
      // this.showPopupAttachment=false;
      this.closeAttachments.emit(false);
    }


  }

  // showFile(item:any){

  //   let  Reader=new FileReader();

    
  //   console.log(item);
  //   Reader.onload=function(e:any){
  //     let div=document.createElement('div');

  //    let newTap=window.open();


  //   if(newTap){
  //     newTap.document.title = item.name;
  //    div.innerHTML=`<iframe width="100%" height="100%" src="${e.target.result}" frameborder="0"></iframe>`
  //    div.style.margin='auto'
  //     newTap.document.body.style.margin='0';
  //     newTap.document.body.style.padding='0';
  //     newTap.document.body.style.height='100vh';
  //    newTap?.document.body.appendChild(div);
  //       }
  

      
  //   }

  //   Reader.readAsDataURL(item);


  // }


  showFile(item: any) {
  // لو العنصر من السيرفر (فيه filePath)
  if (item.filePath) {
    const baseUrl = 'http://gtsdev-001-site3.atempurl.com'; // غيّرها حسب الـ API عندك
    const fileUrl = `${baseUrl}${item.filePath}`;

    const newTab = window.open();
    if (newTab) {
      newTab.document.title = item.fileName;
      const div = document.createElement('div');
      div.innerHTML = `
        <iframe width="100%" height="100%" src="${fileUrl}" frameborder="0"></iframe>
      `;
      div.style.margin = 'auto';
      newTab.document.body.style.margin = '0';
      newTab.document.body.style.padding = '0';
      newTab.document.body.style.height = '100vh';
      newTab.document.body.appendChild(div);
    }
  } 
  // لو العنصر من input (File)
  else {
    const reader = new FileReader();
    reader.onload = function (e: any) {
      const newTab = window.open();
      if (newTab) {
        newTab.document.title = item.name;
        const div = document.createElement('div');
        div.innerHTML = `
          <iframe width="100%" height="100%" src="${e.target.result}" frameborder="0"></iframe>
        `;
        div.style.margin = 'auto';
        newTab.document.body.style.margin = '0';
        newTab.document.body.style.padding = '0';
        newTab.document.body.style.height = '100vh';
        newTab.document.body.appendChild(div);
      }
    };
    reader.readAsDataURL(item);
  }
}

}
