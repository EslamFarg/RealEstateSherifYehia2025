import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModifynamepermissionsService } from './services/modifynamepermissions.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-modifynamepermission',
  templateUrl: './modifynamepermission.component.html',
  styleUrl: './modifynamepermission.component.scss'
})
export class ModifynamepermissionComponent {
// !!!!!!!!!!!!!!!!!!!!!!!!!! Services

fb:FormBuilder=inject(FormBuilder)
ModifynamepermissionsService:ModifynamepermissionsService=inject(ModifynamepermissionsService)
destroyRef:DestroyRef=inject(DestroyRef);
// !!!!!!!!!!!!!!!!!!!!!!!!! Properties


btnaddAndUpdate='add'
pagePermissionsData:any


pageIndex=1
  pageSize=10




// !!!!!!!!!!!!!!!!!!!!!!!!!11 Methods


getDataUpdate(id:any){

}


deleteData(id:any){

}


onPageChanged(page: number) {
  this.pageIndex = page;
  // this.getAllDataGroup();
}


getAllDataPermissions(){
  this.ModifynamepermissionsService.getAllPermissions(this.pageIndex,this.pageSize).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.pagePermissionsData=res
    console.log(res);
  })
}
}
