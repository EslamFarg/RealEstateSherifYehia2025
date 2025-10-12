import { Component, DestroyRef, inject } from '@angular/core';
import { SharedService } from '../../../../shared/services/shared.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Properties !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
  
  dataNationality:any[]=[]
    empData: any = [
    { id: 1, empName: "أحمد محمد علي",    mobile: "01001234567", nationalId: "28506123401234" },
    { id: 2, empName: "منى سامي حسين",     mobile: "01009876543", nationalId: "29705234567890" },
    { id: 3, empName: "خالد إبراهيم حسن",  mobile: "01112345678", nationalId: "30101111222333" },
    { id: 4, empName: "سارة محمود عمر",    mobile: "01233445566", nationalId: "29807098765432" },
    { id: 5, empName: "محمود فؤاد عبد",    mobile: "01055667788", nationalId: "29009234567812" },
    { id: 6, empName: "نهى مصطفى فرج",     mobile: "01199887766", nationalId: "30304123456789" },
    { id: 7, empName: "ياسر سليمان جمال",   mobile: "01234566778", nationalId: "29903123400123" },
    { id: 8, empName: "هالة ربيع ناصر",     mobile: "01022334455", nationalId: "28612123456780" },
    { id: 9, empName: "عمر رامي سعيد",      mobile: "01166778899", nationalId: "30205123400987" },
    { id:10, empName: "ريم محمد خالد",      mobile: "01277889900", nationalId: "29508123456745" }
  ];
  

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Services !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
  _sharedServices:SharedService=inject(SharedService);
  destroyRef:DestroyRef=inject(DestroyRef);



  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods !!!!!!!!!!!!!!!!!!!!!!!!!!!1
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllNationality();
  }
  getAllNationality(){

    this._sharedServices.getAllNationality().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      this.dataNationality=res.nationalities.map((item:any)=>({
        code:item.code,
        nationality_ar:item.nationality_ar
      }))
    })
    
  }

  // pagination

pageIndex=1
pageSize=10


onPageChanged(page: number) {
  this.pageIndex = page;
  // this.fetchEmployees(); // أعد جلب البيانات
  // this.getData()
}
}
