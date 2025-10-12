import { Component, DestroyRef, inject } from '@angular/core';
import { Apartments, nationality } from '../models/tenant';
import { SharedService } from '../../../../../shared/services/shared.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Apartment } from '../../apartment/models/apartment';

@Component({
  selector: 'app-addtenant',
  templateUrl: './addtenant.component.html',
  styleUrl: './addtenant.component.scss'
})
export class AddtenantComponent {
// pageHeading
  title='الرئيسيه';
  subtitle="المستاجر";
  descripition='اضافه مستاجر جديد'

  subScription:any

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Services !!!!!!!!!!!!!!!!!!!!1
  Shared_Services:SharedService=inject(SharedService)

  // getAllNationality
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Properties !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
  dataNationality:nationality[]=[]
  dataRelation:any[]=[]
  destoryRef:DestroyRef=inject(DestroyRef);

  apartmentsData: Apartments[] = [
  {
    id: 1,
    name: "محمد علي",
    nationalId: "1234567890",
    mobile: "0501234567",
    nationality: "مصري",
    relation: "أخ"
  },
  {
    id: 2,
    name: "أحمد حسن",
    nationalId: "2345678901",
    mobile: "0507654321",
    nationality: "سعودي",
    relation: "ابن"
  },
  {
    id: 3,
    name: "سارة محمود",
    nationalId: "3456789012",
    mobile: "0569876543",
    nationality: "أردنية",
    relation: "زوجة"
  }
];


ngOnInit(): void {
  this.getAllNationality();
  this.getAllRelations();
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Methods !!!!!!!!!!!!!!!!!!!!!!!!!1

  getAllNationality(){

    this.Shared_Services.getAllNationality().pipe(takeUntilDestroyed(this.destoryRef)).subscribe((res:any)=>{
     this.dataNationality= res.nationalities.map((item:any)=>({
      code:item.code,
      nationality_ar:item.nationality_ar
      }))
    })
    
  }

  getAllRelations(){
    this.Shared_Services.getAllRelations().pipe(takeUntilDestroyed(this.destoryRef)).subscribe((res:any)=>{
      this.dataRelation=res.relations.map((item:any)=>({
        id:item.id,
        relation_ar:item.relation_ar
      }))
    })
  }







}
