import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MaindataService } from '../services/maindata.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';

@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.component.html',
  styleUrl: './termsandconditions.component.scss'
})
export class TermsandconditionsComponent {

  //!!!!!!!!!!!!!!!!!!!!!!!! Services
  fb:FormBuilder=inject(FormBuilder)
  _mainDataServices:MaindataService=inject(MaindataService)
  destroyRef:DestroyRef=inject(DestroyRef);
  toastr:ToastrService=inject(ToastrService);
  




  // !!!!!!!!!!!!!!!!!!!!!! Property
  termsForm=this.fb.group({
    termsAndConditions: ['',[Validators.required]]
  })


  btnAddandUpdate='add';


  // !!!!!!!!!!!!!!!!!!! Methods

  ngOnInit(){
    this.getAllDataSystemTerms();
  }


  onSubmit(){
    if(this.termsForm.valid){
     if(this.btnAddandUpdate == 'add' || this.btnAddandUpdate == 'update'){
       let data={
        termsAndConditions: this.termsForm.value.termsAndConditions
      }

      this._mainDataServices.createSystemTerms(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res)=>{
        this.toastr.show('تم حفظ البيانات  بنجاح','success');

      })
     
     } 



  }else{
    this.termsForm.markAllAsTouched();
  }
}



getAllDataSystemTerms(){
  this._mainDataServices.getDataSystemTerms().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    console.log(res);
    if(res){
      this.termsForm.patchValue(res)
      this.btnAddandUpdate='update'
      
    }
    // this.systemSettings.patchValue(res)
  })
}

}
