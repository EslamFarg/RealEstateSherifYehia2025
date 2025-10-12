import { NgFor, NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';

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

  showoverlay:any=null



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Method

  onFileSelected(e:any){

    const files=e.target.files;
    Array.from(files).forEach((file:any) => {
    const url=URL.createObjectURL(file);
      this.imgsArr.push({
        file:file,
        url:url
      });
    })
  }



  @HostListener('document:click', ['$event']) Clickout(e:any){


    if(!e.target.closest('.box')){
      this.showoverlay=null;
    }
    
  }

  deleteItem(index:any){
    this.imgsArr.splice(index,1);
  }
}
