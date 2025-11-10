import { ChangeDetectorRef, Component, inject, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-addsendmessage',
  templateUrl: './addsendmessage.component.html',
  styleUrl: './addsendmessage.component.scss'
})
export class AddsendmessageComponent {
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

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

@ViewChild('group',{read:TemplateRef}) group!:TemplateRef<any>
@ViewChild('singlar',{read:TemplateRef}) singlar!:TemplateRef<any>
@ViewChild('container',{read:ViewContainerRef}) container!:ViewContainerRef;


activelink='group'


ngOnInit(): void {
  
  setTimeout(()=>{
  this.container.clear()
  this.container.createEmbeddedView(this.group)
  this.activelink='group'
  
  })

}

sendGroup(){
  this.container.clear();
  this.container.createEmbeddedView(this.group)
  this.activelink='group'
}

sendSinglar(){
  this.container.clear();
  this.container.createEmbeddedView(this.singlar)
  this.activelink='singlar'
}
}
