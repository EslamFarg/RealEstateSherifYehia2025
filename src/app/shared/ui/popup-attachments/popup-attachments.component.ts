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

  onClose(){
    this.closeAttachments.emit(!this.showPopupAttachment);
  }



  hideFile(i:any){
    this.dataFile.splice(i,1);
    if(this.dataFile.length==0){
      this.showPopupAttachment=false;
    }

  }

  showFile(item:any){

    let  Reader=new FileReader();

    
    Reader.onload=function(e:any){
      let div=document.createElement('div');

     let newTap=window.open();


    if(newTap){
          newTap.document.title = item.name;
     div.innerHTML=`<iframe width="100%" height="100%" src="${e.target.result}" frameborder="0"></iframe>`
     div.style.margin='auto'
      newTap.document.body.style.margin='0';
      newTap.document.body.style.padding='0';
      newTap.document.body.style.height='100vh';
     newTap?.document.body.appendChild(div);
        }
  

      
    }

    Reader.readAsDataURL(item);


  }
}
