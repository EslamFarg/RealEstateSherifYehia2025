import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { GroupService } from './pages/dashboard/users/group/services/group.service';
import { ToastrService } from '../toastr/services/toastr.service';
import { Group } from '../../../pages/dashboard/users/group/models/group';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EmptytableComponent } from "../emptytable/emptytable.component";
import { NgClass, NgIf } from '@angular/common';
import { ConfirmDeleteComponent } from '../../components/confirm-delete/confirm-delete.component';
import { GroupService } from './services/group.service';

@Component({
  selector: 'app-popup-add-group',
  templateUrl: './popup-add-group.component.html',
  styleUrl: './popup-add-group.component.scss',
  standalone:true,
  imports: [ReactiveFormsModule, EmptytableComponent, NgClass,NgIf,ConfirmDeleteComponent]
})
export class PopupAddGroupComponent {

  // !!!!!!!!!!!!!!!!!!!!!!! Services
 
   fb: FormBuilder = inject(FormBuilder);
   _groupServices: GroupService = inject(GroupService);
   destroyRef: DestroyRef = inject(DestroyRef);
   toastr: ToastrService = inject(ToastrService);
   
 
   // !!!!!!!!!!!!!!!!!!!!!!!1 Property
 
   groupForm = this.fb.group({
     groupName: ['', [Validators.required, Validators.minLength(3)]],
     description: ['Hello Marco'],
   });
 
   btnaddAndUpdate = 'add';
   idUpdate: any;
   // pagination
   deleteId: any;
 
   pageIndex = 1;
   pageSize = 10;
 
   showDelete = false;
 
   groupsData: { rows: Group[]; paginationInfo: any } = {
     rows: [],
     paginationInfo: null,
   };
 

   @Input() showpopupAddGroup = false;
   @Output() closePopupEvent = new EventEmitter<void>();
   // !!!!!!!!!!!!!!!!!!!!!!!!!!!11 Methods
 
   ngOnInit(): void {
     //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
     //Add 'implements OnInit' to the class.
     this.getAllDataGroup();
   }
 
   onSubmit() {
     // debugger
     if (this.groupForm.valid) {
       if (this.btnaddAndUpdate == 'add') {
         let data = {
           groupName: this.groupForm.value.groupName,
           description: this.groupForm.value.description ?? 'Hello Marco',
         };
         this._groupServices
           .CreateGroup(data)
           .pipe(takeUntilDestroyed(this.destroyRef))
           .subscribe((res: any) => {
             this.toastr.show('تم اضافه المجموعه بنجاح', 'success');
             // this.groupForm.reset();
 
             this.idUpdate=res.id;
 
             this.getAllDataGroup();
           });
         this.btnaddAndUpdate = 'update';
       } else {
         let data = {
           groupId: this.idUpdate,
           groupName: this.groupForm.value.groupName,
           description: this.groupForm.value.description ?? 'Hello Marco',
         };
 
         this._groupServices
           .updateData(data)
           .pipe(takeUntilDestroyed(this.destroyRef))
           .subscribe((res: any) => {
             this.toastr.show('تم تعديل المجموعه بنجاح', 'success');
             // this.groupForm.reset();
             this.btnaddAndUpdate = 'update';
             this.getAllDataGroup();
           });
       }
     } else {
       this.groupForm.markAllAsTouched();
     }
   }
 
   getAllDataGroup() {
     this._groupServices
       .getAllDataGroup(`PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`)
       .pipe(takeUntilDestroyed(this.destroyRef))
       .subscribe((res: any) => {
         this.groupsData = res;
       });
   }
 
   getDataUpdate(id: any) {
     if (id) {
       this._groupServices
         .getDataUpdate(id)
         .pipe(takeUntilDestroyed(this.destroyRef))
         .subscribe((res: any) => {
           this.groupForm.patchValue({
             groupName: res.groupName,
             description: res.description,
           });
           //console.log(res);
 
           this.idUpdate = res.id;
           this.btnaddAndUpdate = 'update';
         });
     }
   }
   onPageChanged(page: number) {
     this.pageIndex = page;
     this.getAllDataGroup();
   }
 
   deleteConfirmed(id: any) {
     this._groupServices
       .deleteData(id)
       .pipe(takeUntilDestroyed(this.destroyRef))
       .subscribe((res: any) => {
         this.toastr.show('تم حذف المجموعه بنجاح', 'success');
         this.getAllDataGroup();
         this.showDelete = false;
         this.idUpdate = null;
         this.groupForm.reset();
         this.btnaddAndUpdate = 'add';
       });
   }
 
   deleteData(id: any) {
     this.showDelete = true;
     this.deleteId = id;
   }
   onClose() {
     this.showDelete = false;
   }
 
 
   resetData(){
     this.groupForm.reset();
     this.btnaddAndUpdate = 'add';
   }


   closePopup(){

    this.closePopupEvent.emit();

   }
}
