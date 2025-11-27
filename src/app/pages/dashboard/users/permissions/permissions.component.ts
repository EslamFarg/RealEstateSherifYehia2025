import { Component, DestroyRef, inject } from '@angular/core';
import { PermissionsService } from './services/permissions.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss'
})
export class PermissionsComponent {

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Services
    permissionsSer:PermissionsService=inject(PermissionsService);
    destroyRef:DestroyRef=inject(DestroyRef);



 treePages:any=[
  {
    id:1,
    name:'البيانات الرئيسيه',
    isOpen:false,
    children:[]
  },
  {
    id:2,
    name:'الصيانة',
    isOpen:false,
    children:[],
  },
  {
    id:3,
    name:'الموظفين',
    isOpen:false,
    children:[],
  },
  {
    id:4,
    name:'المستخدمين',
    isOpen:false,
    children:[],
  },
  {
    id:5,
    name:'الرسايل',
    isOpen:false,
    children:[],
  },
  {
    id:6,
    name:'الاعدادات',
    isOpen:false,
    children:[],
  },
  {
    id:7,
    name:'العقود',
    isOpen:false,
    children:[],
  },
  {
    id:8,
    name:'المحاسبه',
    isOpen:false,
    children:[],
  },

 ]


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods


ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
this.getAllPages();
}



pageToCategory: any = {
  // البيانات الرئيسيه
  "لوحه التحكم": "البيانات الرئيسيه",
   "المالك": "البيانات الرئيسيه",
  "السمسار": "البيانات الرئيسيه",
  "المستاجر":"البيانات الرئيسيه",
  "العقار":"البيانات الرئيسيه",
  "الوحده":"البيانات الرئيسيه",
  "تصنيف الوحده":"البيانات الرئيسيه",
  "شجره العقار":"البيانات الرئيسيه",

  // الصيانه
  "الصيانة":"الصيانة",
  "نوع الصيانة":"الصيانه",

  // الموظفين
  "الموظفين":"الموظفين",
  "صرف الرواتب":"الموظفين",
  "السلفيات":"الموظفين",

  // المستخدمين
  "المستخدمين":"المستخدمين",
  "المجموعة":"المستخدمين",
  "تتبع النشاط":"المستخدمين",
  "ربط المجموعة بالصلاحيات":"المستخدمين",

  // الرسايل
  "نموذج رسايل":"الرسايل",
  "ارسال رسائل":"الرسايل",
  "اعدادت الرسائل":"الرسايل",
  "مجمع الرسائل":"الرسايل",


  // الاعدادات
  "الملف الشخصي":"الاعدادات",
  "اعدادت البرنامج":"الاعدادات",



  // العقود
  "استعلام عن عقد":"العقود",
  "العقود":"العقود",

  // المحاسبه

  "سند صرف ملاك":"المحاسبه",
  "سند صرف خاص بالسمسار":"المحاسبه",
  "استلام الدفعات":"المحاسبه",
  "سند قبض":"المحاسبه",
  "سند صرف":"المحاسبه",
  "البنوك":"المحاسبه",
  "كشف الحساب":"المحاسبه",
  "الارصده الافتتاحيه":"المحاسبه",
  "الحسابات":"المحاسبه",

};




mergePagesIntoTree(pages: any[]) {
  pages.forEach((page: any) => {
    const categoryName=this.pageToCategory[page.pageName];


    if(!categoryName){
      return;
    }


    let category = this.treePages.find((category: any) => category.name === categoryName);

    if (!category) return;  // مهم جداً
    if(!category?.children) category.children=[];
    category?.children.push({
      pageName:page.pageName,
      pageId:page.id,
      isOpen:false,
      permissions:[
        {name:"اضافه"},
        {name:"تعديل"},
        {name:"حذف"},
        {name:"اضافه"},
      ]
    });
  

  })
}


toggleParent(item: any) {
  item.isOpen = !item.isOpen;
}

toggleChild(item: any) {
  item.isOpen = !item.isOpen;
  console.log('TTTTTTT')
}
 getAllPages(){
  this.permissionsSer.getAllPages().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    
    const pages=res.rows

    this.mergePagesIntoTree(pages)
  

    console.log(this.treePages)

  })
 }

}
