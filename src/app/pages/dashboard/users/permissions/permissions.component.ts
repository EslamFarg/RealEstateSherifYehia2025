import { Component, DestroyRef, inject } from '@angular/core';
import { PermissionsService } from './services/permissions.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss'
})
export class PermissionsComponent {

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Services
    permissionsSer:PermissionsService=inject(PermissionsService);
    destroyRef:DestroyRef=inject(DestroyRef);
    showPopupGroup=false

    fb:FormBuilder=inject(FormBuilder)
    toastr:ToastrService=inject(ToastrService)


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
this.getAllDataGroup();
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
  "نوع الصيانة":"الصيانة",

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
      permissions:page?.actions.map((item:any)=>{
        return{
          ...item,
          checked:false
        }
      })
    });
  

  })
}


toggleParent(item: any) {
  item.isOpen = !item.isOpen;
}

toggleChild(item: any) {
  item.isOpen = !item.isOpen;
 
}
 getAllPages(){
  this.permissionsSer.getAllPages().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    
    const pages=res.rows

    this.mergePagesIntoTree(pages)
  

    console.log(this.treePages)

  })
 }


 onClose(e:any){
 this.showPopupGroup=false

 }


  getDataGroup: any;
  getAllDataGroup() {
    this.permissionsSer
      .getAllDataGroup(``)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.getDataGroup = res.rows;
      });
  }


    itemsChecked:any=[];
    // onChangeChecked(e:any,item:any,child:any){

      
    //   const checked=e.target.checked;
      
    //   console.log(e.target.getAttribute('data-id'));

    //   let attributeId=e.target.getAttribute('data-id')

    //   if(checked){

    //    let exists=this.itemsChecked.some((x:any)=> x.id == item.id);

    //    if(!exists){
    //     let dataActions:any
       


       
    //     item.children.forEach((item:any)=>{
    //       // console.log("Children",item);
    //       dataActions=item.permissions;

    //       // console.log('actions',dataActions)
    //     })

    //     dataActions=dataActions.filter((ele:any)=> Number(ele.actionId) == Number(attributeId));


    //     // console.log('DataActions',dataActions)

    //     // console.log(dataActions)

    //     this.itemsChecked.push({
    //       id:item.id,
    //       name:item.name,
    //       actions:dataActions
    //     })

        
    //    }
    

    //   }else{

    //        this.itemsChecked = this.itemsChecked.filter((x:any) => x.id !== item.id);
        

    //   }


    //   console.log(this.itemsChecked)

    // }


//     onChangeChecked(e: any, item: any, child: any) {
//   const checked = e.target.checked;
//   const attributeId = Number(e.target.getAttribute("data-id"));

//   if (checked) {
//     let exists = this.itemsChecked.some((x: any) => x.id == item.id);

//     if (!exists) {
//       // خذي كل الأقسام التي تحتوي على هذه الصلاحية
//       const matchingChildren = item.children
//         .map((child: any) => {
//           const actions = child.permissions.filter(
//             (p: any) => Number(p.actionId) === attributeId
//           );

//           return actions.length > 0
//             ? { childId: child.id, childName: child.name, actions }
//             : null;
//         })
//         .filter((x: any) => x !== null);

//       this.itemsChecked.push({
//         id: item.id,
//         name: item.name,
//         children: matchingChildren
//       });
//     }
//   } else {
//     this.itemsChecked = this.itemsChecked.filter((x: any) => x.id !== item.id);
//   }

//   console.log(this.itemsChecked);
// }




lenPermissions=0
lenPages=0;
lensidebar=0
onChangeChecked(e: any, item: any) {
  const checked = e.target.checked;
  const id = Number(e.target.getAttribute("data-id"));

  // نجيب العنصر لو موجود في itemsChecked
  let existingItem = this.itemsChecked.find((x: any) => x.id === item.id);

  if (checked) {
    // لو لسه مش موجود، نعمل له إنشاء
    if (!existingItem) {
      existingItem = {
        id: item.id,
        name: item.name,
        pages: []
      };
      this.itemsChecked.push(existingItem);
    }

    // نجلب كل الصفحات اللي فيها الصلاحية الجديدة
    const matchedPages = item.children
      .map((page: any) => {
        const matchedActions = page.permissions.filter(
          (p: any) => Number(p.id) === id
        );

        if (matchedActions.length > 0) {
          return {
            pageId: page.pageId,
            pageName: page.pageName,
            actions: matchedActions
          };
        }

        return null;
      })
      .filter((x: any) => x !== null);

  
    matchedPages.forEach((newPage: any) => {
  
      let existingPage = existingItem.pages.find(
        (p: any) => p.pageId === newPage.pageId
      );

      if (!existingPage) {
        
        existingItem.pages.push(newPage);
      } else {
      
        newPage.actions.forEach((act: any) => {
          const exists = existingPage.actions.some(
            (x: any) => x.id === act.id
          );

          if (!exists) {
            existingPage.actions.push(act);
          }
        });
      }
    });

  } else {
    // عند إلغاء الاختيار نشيل الصلاحية
    if (existingItem) {
      existingItem.pages.forEach((page: any) => {
        page.actions = page.actions.filter(
          (x: any) => x.id !== id
        );
      });

      // شيل الصفحات اللي مبقاش فيها ولا صلاحية
      existingItem.pages = existingItem.pages.filter(
        (p: any) => p.actions.length > 0
      );

      // لو القسم كله مفيهوش صلاحيات خالص → شيله
      if (existingItem.pages.length === 0) {
        this.itemsChecked = this.itemsChecked.filter(
          (x: any) => x.id !== item.id
        );
      }
    }
  }


  console.log(this.itemsChecked)
 
   this.lenPermissions= this.itemsChecked?.map((section:any) => section.pages.flatMap((page:any) => page.actions).length)
      ?.reduce((a:any, b:any) => a + b, 0)
  

      this.lenPages= this.itemsChecked?.map((section:any) => section.pages.length)
      ?.reduce((a:any, b:any) => a + b, 0)



      this.lensidebar=this.itemsChecked.length
    

        const allActionIds = this.itemsChecked
    .flatMap((section:any) => section.pages.flatMap((page:any) => page.actions.map((act:any) => act.id)));

  const uniqueActionIds = Array.from(new Set(allActionIds));

  this.PermissionGroup.patchValue({
    pageActionsId: uniqueActionIds
  });
}


selectAll() {
  // نفرغ itemsChecked عشان نبدأ من جديد
  this.itemsChecked = [];

  // نمر على كل قسم في treePages
  this.treePages.forEach((section: any) => {
    // نتأكد إن فيه أطفال (pages)
    if (section.children && section.children.length > 0) {
      const pagesWithActions = section.children.map((page: any) => {
        return {
          pageId: page.pageId,
          pageName: page.pageName,
          actions: page.permissions.map((act: any) => ({ ...act })) // ناخد كل الصلاحيات
        };
      });

      if (pagesWithActions.length > 0) {
        this.itemsChecked.push({
          id: section.id,
          name: section.name,
          pages: pagesWithActions
        });
      }
    }



   const allActionIds = this.itemsChecked
  .flatMap((section: any) => 
    section.pages.flatMap((page: any) => 
      page.actions.map((act: any) => act.id)
    )
  );

  // إزالة التكرار
const uniqueActionIds = Array.from(new Set(allActionIds));
    this.PermissionGroup.patchValue({
     pageActionsId : uniqueActionIds
    })



  });

  // نحدث العدادات بعد اختيار الكل
  this.lenPermissions = this.itemsChecked
    .map((section: any) => section.pages.flatMap((page: any) => page.actions).length)
    .reduce((a: number, b: number) => a + b, 0);

  this.lenPages = this.itemsChecked
    .map((section: any) => section.pages.length)
    .reduce((a: number, b: number) => a + b, 0);

  this.lensidebar = this.itemsChecked.length;

  console.log('All selected:', this.itemsChecked);
}


clearAll(){
  this.itemsChecked=[]
  this.lenPermissions=0
  this.lenPages=0
  this.lensidebar=0
  this.PermissionGroup.reset()
}


isActionChecked(sectionId: number, pageId: number, id: number): boolean {
  const section = this.itemsChecked.find((s: any) => s.id === sectionId);
  if (!section) return false;

  const page = section.pages.find((p: any) => p.pageId === pageId);
  if (!page) return false;

  return page.actions.some((a: any) => a.id === id);
}


PermissionGroup:FormGroup=this.fb.group({
  groupId:[null,Validators.required],
  pageActionsId:[[],Validators.required]
})


  addPermission(){
    
    if(this.PermissionGroup.value.pageActionsId?.length <= 0){
      this.toastr.show('يرجى تحديد صلاحية ','error')
    }

    console.log(this.PermissionGroup.value)
    if(this.PermissionGroup.valid){

      this.permissionsSer.addPermissions(this.PermissionGroup.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
        //console.log(res)
        this.toastr.show('تم انشاء صلاحيه لهذه المجموعه بنجاح','success');
        this.PermissionGroup.reset();
        this.itemsChecked=[]
        this.lenPermissions=0
        this.lenPages=0
        this.lensidebar=0
      })

  }
  else{
    this.PermissionGroup.markAllAsTouched()
  }

}

  }
