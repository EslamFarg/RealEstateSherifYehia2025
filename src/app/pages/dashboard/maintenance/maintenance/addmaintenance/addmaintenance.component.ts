import { Component, DestroyRef, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TypemaintenanceService } from '../../typemaintenance/services/typemaintenance.service';
import { EmployeesService } from '../../../employees/employees/services/employees.service';
import { AccountService } from '../../../accounting/accounts/services/account.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { MaintenanceService } from '../services/maintenance.service';
import { environment } from '../../../../../../environment/environment';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';

@Component({
  selector: 'app-addmaintenance',
  templateUrl: './addmaintenance.component.html',
  styleUrl: './addmaintenance.component.scss'
})
export class AddmaintenanceComponent {


  // !!!!!!!!!!!!!!!!!!!!!!!!! Services

  fb:FormBuilder=inject(FormBuilder)
  _typeMaintenanceSer:TypemaintenanceService=inject(TypemaintenanceService)
  _employeesSer:EmployeesService=inject(EmployeesService)
  _accountSer:AccountService=inject(AccountService)
  _maintenanceSer:MaintenanceService=inject(MaintenanceService)
  destroyRef:DestroyRef=inject(DestroyRef);
  dataFiles:any[]=[];
  toastr:ToastrService=inject(ToastrService)

  _behaviorServices:EditBehaviorServiceService=inject(EditBehaviorServiceService)

  // !!!!!!!!!!!!!!!!!!!!!!! Property


  mainTenanceData=this.fb.group({
BookNumber:['',[Validators.required,Validators.minLength(3)]],
RequestDate:['',[Validators.required]],
TargetType:['',[Validators.required]],
TargetId:['',[Validators.required]],
MaintenanceTypeId:[null,[Validators.required]],
EmployeeId:[null,[Validators.required]],
AccountId:[null,[Validators.required]],
Status:[null,[Validators.required]],
Amount:['',[Validators.required]],
Notes:[''],
Files:new FormControl<any[]>([]),
// description:['']
  })


  canShowBtns:any
  errorSearchData:any
  // ReportNumber:any

  @ViewChild('ReportNumber') ReportNumber!:ElementRef
  @ViewChild('attachments',{static:false}) attachmentsComp: any
  btnAddandUpdate='add'


  FormSearch=this.fb.group({
      id:['',[Validators.required]],
      name: [''],
      propertyName: [''],
      propertyID: [''],
      city:[''],
      district:[''],
      street:['']
      // area: [''],
      // floorNumber: [''],
      // roomsCount: [''],
      // unitType: [''],
      // unitCategoryName: [''],
      // price: [''],
      // description: ['']
  })

  idRemoveFiles:any[]=[];
  selectFilter=0;


  dataItemsTypeMaintenance:any[]=[];
  dataItemsSearch:any
  dataItemsEmployees:any[]=[]
  dataItemsAccounts:any[]=[]
  dataItemsStatus=[{name:'قيد التنفيذ'},{name:'تحت الاصلاح'},{name:'معطله'},{name:'اتصلحت'}]
  dataFilter=[{
    id:1,
    name:'اسم الوحده' 
  },
  {
  id:2,
  name:"رقم الوحده"
  },
  {
    id:3,
    name:'اسم العقار'

  },
  {
    id:2,
    name:' رقم العقار'
  }
];

idItem:any;

showDelete=false
deleteId:any

@ViewChild('searchVal') searchVal!:ElementRef
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllTypeMaintenance();
    this.getAllEmployees();
    this.getAllAccount();

    this._behaviorServices.idSubscribe.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(id=>{

      // console.log(id);

      if(id){

        let ShapeDataFilter={
  criteriaDto: {
    paginationInfo: {
      pageIndex: 0,
      pageSize: 0
    }
  },
  searchFilter: {
    column: 0,
    value: String(id)
  }
}
        this._maintenanceSer.getDataUpdate(ShapeDataFilter).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
            // console.log(res)
          this.idItem=res.rows[0].id;
          
          this.mainTenanceData.patchValue({
            BookNumber:res.rows[0]?.bookNumber,
            RequestDate:res.rows[0]?.requestDate,
            TargetType:res.rows[0]?.targetType,
            TargetId:res.rows[0]?.targetId,
            MaintenanceTypeId:res.rows[0]?.maintenanceTypeId,
            EmployeeId:res.rows[0]?.employeeId,
            AccountId:res.rows[0]?.accountId,
            Status:res.rows[0]?.status,
            Amount:res.rows[0]?.amount,
            Notes:res.rows[0]?.notes
          })


          this.FormSearch.patchValue({
              id:res.rows[0]?.targetId,
      name: res.rows[0]?.unitName,
      propertyName: res.rows[0]?.buildingName,
      propertyID: res.rows[0]?.buildingNumber,
      city:res.rows[0]?.city,
      district:res.rows[0]?.district,
      street:res.rows[0]?.street

          })

          
          console.log(res.rows[0]);
          this.canShowBtns=true
          this.btnAddandUpdate='update'
          
        })
      }
      
      
      // this.idItem=res;



    })
    }

  onSubmit() {


 

 
  if (this.mainTenanceData.invalid || this.FormSearch.get('id')?.invalid) {
    this.mainTenanceData.markAllAsTouched();
    this.FormSearch.markAllAsTouched();
    return;
  }


  if(this.btnAddandUpdate == 'add'){
    const formData=new FormData();


  formData.append('BookNumber',this.mainTenanceData.value.BookNumber || '');
  formData.append('RequestDate',this.mainTenanceData.value.RequestDate || '');
  formData.append('TargetType',this.mainTenanceData.value.TargetType || '');
  formData.append('TargetId',this.mainTenanceData.value.TargetId || '');
  formData.append('MaintenanceTypeId',this.mainTenanceData.value.MaintenanceTypeId || '');
  formData.append('EmployeeId',this.mainTenanceData.value.EmployeeId || '');
  formData.append('AccountId',this.mainTenanceData.value.AccountId || '');
  formData.append('Status',this.mainTenanceData.value.Status || '');
  formData.append('Amount',this.mainTenanceData.value.Amount || '');
  formData.append('Notes',this.mainTenanceData.value.Notes || '');
  // formData.append('PropertyID',this.FormSearch.value.id || '');

  const files=this.mainTenanceData.value.Files || [];

  files.forEach((file:any)=>{
 formData.append('Files',file);
  })

 
  


  this._maintenanceSer.createData(formData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.toastr.show('تم اضافه الصيانه بنجاح','success');
    console.log(res);
    this.mainTenanceData.patchValue(res);
    this.btnAddandUpdate='update'
    this.canShowBtns=true;
    this.ReportNumber.nativeElement.value=res.id;
    this.idItem=res.id

    this.dataFiles = [];

if (Array.isArray(res.attachments)) {
  res.attachments.forEach((file:any) => {
    this.dataFiles.push({
      id: file.id,
      url: `${environment.apiUrl}${file.filePath}`,
      file: null,
    });
  });
}
this.mainTenanceData.get('Files')?.setValue(this.dataFiles)
this.attachmentsComp.imgsArr = this.dataFiles;

console.log("dataFiles",this.dataFiles);
  })

  }else{
    // Update


    

    let formData=new FormData();

    formData.append('Id',this.idItem || '');
    formData.append('BookNumber',this.mainTenanceData.value.BookNumber || '');
    formData.append('RequestDate',this.mainTenanceData.value.RequestDate || '');
    formData.append('TargetType',this.mainTenanceData.value.TargetType || '0');
    formData.append('TargetId',this.mainTenanceData.value.TargetId || '');
    formData.append('MaintenanceTypeId',this.mainTenanceData.value.MaintenanceTypeId || '');
    formData.append('EmployeeId',this.mainTenanceData.value.EmployeeId || '');
    formData.append('AccountId',this.mainTenanceData.value.AccountId || '');
    formData.append('Status',this.mainTenanceData.value.Status || '');
    formData.append('Amount',this.mainTenanceData.value.Amount || '');
    formData.append('Notes',this.mainTenanceData.value.Notes || '');
    // formData.append('PropertyID',this.FormSearch.value.id || '');

      this.dataFiles.forEach((img:any) => {
       if (img.file) {
    formData.append('NewFiles', img.file);
  }
      
    });


    this.idRemoveFiles.forEach((id:any)=>{
      formData.append('RemovedAttachmentIds',id);
    })


    this._maintenanceSer.updateData(formData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      this.toastr.show('تم تعديل الوحده بنجاح','success');
      this.dataFiles=[];
      this.btnAddandUpdate='add';
      this.canShowBtns=false;
      this.resetForm();
    })

  }
  
}



  resetForm() {
   this.ReportNumber.nativeElement.value='';
  this.searchVal.nativeElement.value=''; 
   this.dataFiles = [];
  this.idRemoveFiles = [];
      this.btnAddandUpdate='add';
  this.canShowBtns=false;
  this.mainTenanceData.reset();
  this.FormSearch.reset();
    this.attachmentsComp?.resetImages();
  
  
 
  
  this.mainTenanceData.get('Files')?.setValue([]);
  



   
}



  getFc(name:string){
     return this.mainTenanceData.get(name) as FormControl
    }
  getSearchFc(name:string){
     return this.FormSearch.get(name) as FormControl
    }



   getAllTypeMaintenance(){
    
     this._typeMaintenanceSer.getAllDataMaintenance({}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
       this.dataItemsTypeMaintenance=res.rows;
     
     })
   }

   getAllEmployees(){
    
    this._employeesSer.getAllDataEmployees({}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      this.dataItemsEmployees=res.rows.map((item:any)=>{
        return {
          id:item.id,
          name:item.name
        }
      });
      
    })
  }

  getAllAccount(){
    this._accountSer.getAllData({}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
     this.dataItemsAccounts=res.rows.map((item:any)=>{
       return {
         id:item.id,
         name:item.name
       }
     });

     console.log(this.dataItemsAccounts);
    })
  }


  OnDataFiles(val:any){
    this.mainTenanceData.get('Files')?.setValue(val)

  }

  fnIdRemoveFiles(ids:any){
    this.dataFiles=this.dataFiles.filter((item:any)=>item.id!=ids);
    // this.mainTenanceData.get('Files')?.setValue(this.dataFiles);

    this.idRemoveFiles.push(ids);
  }
  

  searchControl = new FormControl('');

  SelectDataFilterSearch(e:any){
   
   
      let ShapeSearch={
        
  criteriaDto: {
    paginationInfo: {
      pageIndex: 0,
      pageSize: 0
    }
  },
  searchFilter: {
    column: 0,
    value: e.value
  }
      }
      
    if(e.index == 0){
    
      ShapeSearch.searchFilter.column=1
      this._maintenanceSer.searchByUnit(ShapeSearch).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
       const row = res.rows[0];
       console.log(row);
this.FormSearch.patchValue({
  id: row?.id,
  name: row?.name,
  propertyName: row?.propertyName,
  propertyID: row?.propertyID,
  city: row?.city,
  district: row?.district,
  street: row?.street
});

this.dataItemsSearch = row; 
this.mainTenanceData.patchValue({
  TargetId:row?.id,
  TargetType:'0'
})

      })

    }else if(e.index == 1){
      ShapeSearch.searchFilter.column=0;
      this._maintenanceSer.searchByUnit(ShapeSearch).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
         const row = res.rows[0]; // لو النتيجة Array (غالبًا كده)
this.FormSearch.patchValue({
  id: row?.id,
  name: row?.name,
  propertyName: row?.propertyName,
  propertyID: row?.propertyID,
  city: row?.city,
  district: row?.district,
  street: row?.street
});

this.dataItemsSearch = row; 
this.mainTenanceData.patchValue({
  TargetId:row?.id,
  TargetType:'0'
})
      })

    }else if(e.index == 2){
      ShapeSearch.searchFilter.column=1;
      this._maintenanceSer.searchByProperty(ShapeSearch).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
          const row = res.rows[0]; // لو النتيجة Array (غالبًا كده)
          console.log(res);
this.FormSearch.patchValue({
  id: row?.id,
  name: row?.name,
  propertyName: row?.propertyName,
  propertyID: row?.buildingNumber
,
  city: row?.city,
  district: row?.district,
  street: row?.street
});

this.dataItemsSearch = row; 
this.mainTenanceData.patchValue({
  TargetId:row?.id,
  TargetType:'1'
})
      })
    }else if(e.index == 3){
      ShapeSearch.searchFilter.column=0;
      this._maintenanceSer.searchByProperty(ShapeSearch).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
         const row = res.rows[0]; // لو النتيجة Array (غالبًا كده)
         console.log(res);
this.FormSearch.patchValue({
  id: row?.id,
  name: '-',
  propertyName: row?.name,
  propertyID: row?.
buildingNumber,
  city: row?.city,
  district: row?.district,
  street: row?.street
});

this.dataItemsSearch = row; 
this.mainTenanceData.patchValue({
  TargetId:row?.id,
  TargetType:"1"
})


      })
    }
 


  }


  ShowDeletePopup(){
    this.showDelete=true;
    this.deleteId=this.idItem
  }


  onClose(){
    this.showDelete=false;
  }
  deleteConfirmed(e:any){

    this.showDelete=false;
    this._maintenanceSer.deleteData(e).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      this.toastr.show('تم حذف الصيانة بنجاح','success');
      this.resetForm();
      this.btnAddandUpdate='add';
      this.canShowBtns=false;
    })
  }


  SearchData(val:any){
    let dataSearch={
        criteriaDto: {
    paginationInfo: {
      pageIndex: 0,
      pageSize: 0
    }
  },
  searchFilter: {
    column: 0,
    value: val.value
  }
    }


    this._maintenanceSer.searchData(dataSearch).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    
      // debugger
      console.log(res);
      const row=res.rows[0];
      // debugger
      this.mainTenanceData.patchValue({
        BookNumber:row?.bookNumber,
        RequestDate:row?.requestDate,
        TargetType:row?.targetType,
        TargetId:row?.targetId,
        MaintenanceTypeId:row?.maintenanceTypeId,
        EmployeeId:row?.employeeId,
        AccountId:row?.accountId,
        Status:row?.status,
        Amount:row?.amount,
        Notes:row?.notes
      })

      console.log("targetType",row)

      this.FormSearch.patchValue({
        id: row?.id,
        name: row?.unitName,
        propertyName: row?.buildingName,
        propertyID: row?.buildingNumber,
        city: row?.city,
        district: row?.district,
        street: row?.street
      })

      this.idItem=row?.id
this.dataFiles = [];

if (Array.isArray(row?.attachments)) {
  row.attachments.forEach((file:any) => {
    this.dataFiles.push({
      id: file.id,
      url: `${environment.apiUrl}${file.filePath}`,
      file: null,
    });
  });
}
this.mainTenanceData.get('Files')?.setValue(this.dataFiles);
this.dataFiles=row.attachments
this.attachmentsComp.imgsArr = this.dataFiles;
      this.btnAddandUpdate='update';
      this.canShowBtns=true;




   
    })
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this._behaviorServices.clearId){
      this._behaviorServices.clearId();
    }
  }
}
