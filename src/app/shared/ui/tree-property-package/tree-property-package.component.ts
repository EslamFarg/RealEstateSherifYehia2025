import { NgIf } from '@angular/common';
import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { TreerealService } from '../../../pages/dashboard/main/treereal/services/treereal.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tree-property-package',
  templateUrl: './tree-property-package.component.html',
  styleUrl: './tree-property-package.component.scss',
  standalone:true,
  imports:[NgIf]
})
export class TreePropertyPackageComponent {

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services
  treeRealServices:TreerealService=inject(TreerealService)
  destroyRef:DestroyRef=inject(DestroyRef);



treeProperty:any=[];

@Output() sendDataSelect=new EventEmitter()


    toggle(node: any) {
    node.expanded = !node.expanded;
  }


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllDataPropertyTree();
  
  }


  AllDataTreeProperty:any=[]
  getAllDataPropertyTree(){
//     let pagination={
//   "criteriaDto": {
//     "paginationInfo": {
//       "pageIndex": 0,
//       "pageSize": 0
//     }
//   },
//   "searchFilter": {
//     "column": 0,
//     "value": "string"
//   }
// }
  this.treeRealServices.getDataPropertyTree({}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    // console.log(res);

    this.treeProperty=res.map((item:any)=>{
      return{
        id:item.id,
        title:item.name,
        type:item.type,
        expanded:false,
        children:item.children.map((child:any)=>{
          return{
            id:child.id,
            title:child.name,
            type:child.type,
            expanded:false,
            children:child.children.map((child2:any)=>{
              return{
                id:child2.id,
                title:child2.name,
                type:child2.type,
                expanded:false,
                children:child2.children.map((child3:any)=>{
                  return{
                    id:child3.id,
                    title:child3.name,
                    type:child3.type,
                    expanded:false,
                  }
                })
              }
            })
          }
        })
      }
    });

    console.log(this.treeProperty);

    
  })
  }


  // getDataUnit(item:any){
  //   console.log(item);

  // }

  // toggle(item:any)


  getDataUnit(lonelinees:any){
    console.log(lonelinees)


    this.treeRealServices.getDataUnitById(lonelinees.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      console.log(res);
      this.sendDataSelect.emit(res)
    })
  }
}
