import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TypemaintenanceService } from '../../typemaintenance/services/typemaintenance.service';
import { EmployeesService } from '../../../employees/employees/services/employees.service';
import { AccountService } from '../../../accounting/accounts/services/account.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { MaintenanceService } from '../services/maintenance.service';

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



  // !!!!!!!!!!!!!!!!!!!!!!! Property


  mainTenanceData=this.fb.group({
    BookNumber:['',[Validators.required]],
RequestDate:['',[Validators.required]],
TargetType:['',[Validators.required]],
TargetId:['',[Validators.required]],
MaintenanceTypeId:[null,[Validators.required]],
EmployeeId:[null,[Validators.required]],
AccountId:[null,[Validators.required]],
Status:[null,[Validators.required]],
Amount:['',[Validators.required]],
Notes:[''],
Files:[null]
  })


  idRemoveFiles:any[]=[];
  selectFilter=0;

  dataItemsTypeMaintenance:any[]=[]
  dataItemsEmployees:any[]=[]
  dataItemsAccounts:any[]=[]
  dataItemsStatus=[{name:'قيد التنفيذ'},{name:'تحت الاصلاح'},{name:'معطله'},{name:'اتصلحت'}]
  dataFilter=[{
    id:1,
    name:'الوحده'
  },
  {
    id:2,
    name:'العقار'
  }
];





  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllTypeMaintenance();
    this.getAllEmployees();
    this.getAllAccount();
    }

  onSubmit(){

    if(this.mainTenanceData.valid){
      
    }else{
      this.mainTenanceData.markAllAsTouched();
    }

  }


  getFc(name:string){
     return this.mainTenanceData.get(name) as FormControl
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
  


  SelectDataFilterSearch(e:any){
    if(e.value == undefined){
      this.toastr.show('الرجاء اختيار نوع البحث','error');
      return;
    }


      let data={
        
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
    


      this._maintenanceSer.searchByUnit(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
        // this.dataItemsTypeMaintenance=res.rows;
        console.log(res);
      
      })

    }else{

    }
 
  }



}
