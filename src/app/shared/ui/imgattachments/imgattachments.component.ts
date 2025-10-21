import { NgFor, NgClass } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-imgattachments',
  templateUrl: './imgattachments.component.html',
  styleUrl: './imgattachments.component.scss',
  standalone:true,
  imports: [NgFor, NgClass]
})
export class ImgattachmentsComponent {





  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! Property
  imgsArr:any=[]
  @Output() idRemoveFiles=new EventEmitter();

  idRemoveFileArr:any=[]

  @Output() dataImgs=new EventEmitter()
  showoverlay:any=null





  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Method

  onFileSelected(e:any){

    const files=e.target.files;
    if(files){
Array.from(files).forEach((file:any) => {
    const url=URL.createObjectURL(file);
      this.imgsArr.push({
        file:file,
        url:url
      });
    })
    this.dataImgs.emit(this.imgsArr)
    }
    

    
  }



  @HostListener('document:click', ['$event']) Clickout(e:any){


    if(!e.target.closest('.box')){
      this.showoverlay=null;
    }
    
  }

  deleteItem(index:any,id:any){
    this.imgsArr.splice(index,1);
    if(id){
      this.idRemoveFileArr.push(id);
      this.idRemoveFiles.emit(this.idRemoveFileArr);
       
    }
   
  }

  resetImages() {
  this.imgsArr = [];
  // this.previewUrls = [];
  this.dataImgs.emit(this.imgsArr);
}
}
