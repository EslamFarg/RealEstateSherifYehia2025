import { Component, DestroyRef, ElementRef, inject, ViewChild } from '@angular/core';
import { ContractdetailsService } from './services/contractdetails.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';
import { Router } from '@angular/router';
import { EditBehaviorServiceService } from '../../../../shared/services/edit-behavior-service.service';

@Component({
  selector: 'app-contractdetails',
  templateUrl: './contractdetails.component.html',
  styleUrl: './contractdetails.component.scss'
})
export class ContractdetailsComponent {

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services
  contractdetailsService:ContractdetailsService=inject(ContractdetailsService);
  destroyRef:DestroyRef=inject(DestroyRef)
  toastr:ToastrService=inject(ToastrService)
  router:Router=inject(Router)
  editBehaviorService:EditBehaviorServiceService=inject(EditBehaviorServiceService)




  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Properties


  dataFilter=[
    {
    id:0,
    name:'رقم العقد'
  },
  {
    id:1,
    name:'اسم المستأجر'
  },
  {
    id:2,
    name:'اسم الوحده'
  }

]


  typeStatus='منتهي'
  statusContract=false;

  getAllDataContract:any=[];


pageIndex = 1;
pageSize = 4;
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11 Methods

today=new Date();
isExpired=false;
ngOnInit(){

  // const contractEnd=new Date('2024-06-15');
  this.getAllContracts();
}


isEnded(date: string): boolean {
  return new Date() > new Date(date);
}


selectedMonths: any[] = [];
itemSelectedMonths: any[] = [];
  endingContract(e:any,id:any){
    e.stopPropagation();

    if(this.itemSelectedMonths.length <=0){
      this.toastr.show('يرجى اختيار الاشهر المراد انهاء العقد لها','error');
      return;
    }


    // console.log(id)
    this.router.navigate(['/dashboard/terminationcontract']);
    this.editBehaviorService.setId({
      contractId:id,
      endMonthIndex:this.itemSelectedMonths[0].monthIndex,
      endYear:this.itemSelectedMonths[0].year
    })
    

    
    


  }



  newingContract(e:any,id:any){
    e.stopPropagation();  

    console.log(id);
    this.editBehaviorService.setId(id)

    this.router.navigate(['/dashboard/contractrenewal']);

  }



  onFilterSearch(e:any){
   
  let shapeSearch={
  "criteriaDto": {
    "paginationInfo": {
      "pageIndex": this.pageIndex,
      "pageSize": this.pageSize
    }
  },
  "searchFilter": {
    "column": 0,
    "value": e.value.trim()
  }
}
  console.log(e);

  if(e.index==0){
    shapeSearch.searchFilter.column= 0;
  }else if(e.index==1){

    shapeSearch.searchFilter.column= 12;
  }else if(e.index==2){
    shapeSearch.searchFilter.column= 7;
  }

  this.contractdetailsService.filterSearchContract(shapeSearch).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    console.log(res);
    this.getAllDataContract=res;

    this.getAllDataContract.rows.forEach((item: any) => {
  item.months = this.generateMonths(item.leaseStartDate, item.leaseMonths);
});
    console.log(this.getAllDataContract)
  })

  }


  isPopupVisibleContract = false;


    showPopupImgContract(attach:any){
    if(attach.length == 0){
      this.isPopupVisibleContract = false;
      this.toastr.show('لا يوجد مرفقات','error');
      return;
    }
    
    this.isPopupVisibleContract=!this.isPopupVisibleContract;


  }
  
  showImgInNewTap(filePath:any){
   let newTap= window.open('', '_blank');

   if(newTap){
      newTap.document.title='Contract Image';

      newTap.document.body.style.margin='0';
      newTap.document.body.style.display='flex';
      newTap.document.body.style.justifyContent='center';
      newTap.document.body.style.alignItems='center';
      newTap.document.body.style.height='100vh';
      newTap.document.body.style.backgroundColor='#f0f0f0';

      newTap.document.body.innerHTML=`
      <img src="http://gtsdev-001-site3.atempurl.com/${filePath}" alt="Contract Image" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
      `
   }
   
    
  }


  monthsArabic = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر"
];


generateMonths(startDate: string, monthsCount: number) {
  const result = [];
  let date = new Date(startDate);

  for (let i = 0; i < monthsCount; i++) {

    result.push({
      monthIndex: date.getMonth() + 1,  
      year: date.getFullYear(),      
      monthName: this.monthsArabic[date.getMonth()]
    });

 
    date.setMonth(date.getMonth() + 1);
  }

  return result;
}

@ViewChild('containerMonths') containerMonths!:ElementRef;
prevMonth(){

  this.containerMonths.nativeElement.scrollBy({
    left: -150,
    behavior: 'smooth'
  });
}


nextMonth(){
  this.containerMonths.nativeElement.scrollBy({
    left: 150,
    behavior: 'smooth'
  });
}





// toggleMonthSelection(item: any, month: any) {
//   if (!item.selectedMonths) item.selectedMonths = [];

//   // console.log(month);

//   const exists = item.selectedMonths.find(
//     (m: any) => m.monthIndex === month.monthIndex && m.year === month.year
//   );

//   if (exists) {
  
//     item.selectedMonths = item.selectedMonths.filter(
//       (m: any) => !(m.monthIndex === month.monthIndex && m.year === month.year)
//     );
//   } else {
//     // إضافة الاختيار
//     item.selectedMonths.push(month);
//   }

//   this.itemSelectedMonths=item.selectedMonths;
//   console.log(this.itemSelectedMonths);
// }


toggleMonthSelection(item: any, month: any) {
  // إنشاء مصفوفة الاختيار لو غير موجودة
  if (!item.selectedMonths) {
    item.selectedMonths = [];
  }

  // لو نفس الشهر المختار ← إلغاء الاختيار
  if (item.selectedMonths.length === 1 &&
      item.selectedMonths[0].monthIndex === month.monthIndex &&
      item.selectedMonths[0].year === month.year) {
    item.selectedMonths = [];
    this.itemSelectedMonths = [];
    return;
  }

  // ✅ اختيار شهر واحد فقط
  item.selectedMonths = [month];

  // تخزين في متغير خارجي إذا احتجته
  this.itemSelectedMonths = [month];

  console.log("Selected Month:", this.itemSelectedMonths);
}




// getAllDataContract(){

// }



getAllContracts(){
  let pagination={
  "paginationInfo": {
    "pageIndex": this.pageIndex,
    "pageSize": this.pageSize
  }
}
  this.contractdetailsService.getAllDataContract(pagination).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.getAllDataContract=res
    console.log(this.getAllDataContract)
  })
}

onPageChanged(page:any){
  this.pageIndex = page;
  this.getAllContracts();

}
}
