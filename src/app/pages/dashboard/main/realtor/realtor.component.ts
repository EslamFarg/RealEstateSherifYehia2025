import { Component, inject } from '@angular/core';
import { Realtor } from './models/realtor';
import { nationality } from '../tenant/models/tenant';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
  selector: 'app-realtor',
  templateUrl: './realtor.component.html',
  styleUrl: './realtor.component.scss'
})
export class RealtorComponent {

  title='الرئيسيه'
  subtitle="السمسار"

   realtorData: Realtor[] = [
  { id: 1, brokerName: "أحمد سمير",     mobile: "01001234567", bonus: 500,  },
  { id: 2, brokerName: "منى عبد الله",  mobile: "01009876543", bonus: 300,  },
  { id: 3, brokerName: "خالد محمود",    mobile: "01112345678", bonus: 450,  },
  { id: 4, brokerName: "سارة علي",      mobile: "01233445566", bonus: 250,  },
  { id: 5, brokerName: "محمود ربيع",    mobile: "01055667788", bonus: 600,  },
  { id: 6, brokerName: "نهى فوزي",      mobile: "01199887766", bonus: 400,  },
  { id: 7, brokerName: "ياسر ناصر",     mobile: "01234566778", bonus: 700,  },
  { id: 8, brokerName: "هالة خليل",     mobile: "01022334455", bonus: 550,  },
  { id: 9, brokerName: "عمر عبد الرحمن", mobile: "01166778899", bonus: 350,  },
  { id:10, brokerName: "ريم حسن",       mobile: "01277889900", bonus: 800,  }
];


ngOnInit(){
  this.getAllNationality();
}


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

shared_service:SharedService=inject(SharedService)


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! pagination!!!!!!!!!!!!!!!!!!!!!!!!

pageIndex=1
pageSize=10


onPageChanged(page: number) {
  this.pageIndex = page;
  // this.fetchEmployees(); // أعد جلب البيانات
  // this.getData()
}
//
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 GetAll Nationality!!!!!!!!!!!!!!!!!!!!!!!!1

dataNationality:nationality[]=[]



getAllNationality(){
  this.shared_service.getAllNationality().subscribe((res:any)=>{
    this.dataNationality=res.nationalities.map((item:any)=>({
      code:item.code,
      nationality_ar:item.nationality_ar
    }))
  })
}


}
