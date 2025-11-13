import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-concatgrouppermissions',
  templateUrl: './concatgrouppermissions.component.html',
  styleUrl: './concatgrouppermissions.component.scss'
})
export class ConcatgrouppermissionsComponent {
// !!!!!!!!!!!!!!!!!!!!!!!! Services
fb:FormBuilder=inject(FormBuilder)


// !!!!!!!!!!!!!!!!!!!!!1 Properties

btnaddAndUpdate='add'

FormPermissionGroup:any=this.fb.group({
  groupName:[null,[Validators.required]],
  // permission:[null,[Validators.required]]
  items:this.fb.array([this.createItem()])
})


// !!!!!!!!!!!!!!!!!!!!!!!!1 Methods


addPageAndPermission(){
  this.items.push(this.createItem())
  console.log('Add Data')
}


createItem(){

  return this.fb.group({
    pages:[null,[Validators.required]],
    permissions:[null,[Validators.required]]
  })

}


get items():FormArray{
  return this.FormPermissionGroup.get('items') as FormArray
}


addItem(){
  this.items.push(this.createItem())
}
onSubmit(){

}
}
