import { Component, DestroyRef, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../accounts/services/account.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AccountstatementService } from './services/accountstatement.service';

@Component({
  selector: 'app-accountstatement',
  templateUrl: './accountstatement.component.html',
  styleUrl: './accountstatement.component.scss'
})
export class AccountstatementComponent {

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11 Services
  fb:FormBuilder=inject(FormBuilder);
  _accountsStatementSer:AccountstatementService=inject(AccountstatementService)
  destroyRef:DestroyRef=inject(DestroyRef);




  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Property

  FromSearchData:any=this.fb.group({
  accountId: [null,[Validators.required]],
  fromDate: ['',[Validators.required]],
  toDate: ['',[Validators.required]],
  })

 accountStatement:any = [];

  // pagination

pageIndex=1
pageSize=10

accountData:any=[]

summaryList:any

@ViewChild('accountElement') accountElement!:ElementRef;

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

  this.getAllAccounts();  
}

onPageChanged(page: number) {
  this.pageIndex = page;
  this.searchOnData();
}


getAllAccounts(){
  let pagination={
  "paginationInfo": {
    "pageIndex": 0,
    "pageSize": 0
  }
}
this._accountsStatementSer.getAllaccountsfinancially(pagination).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
  this.accountData = res.rows;
  console.log(this.accountData);
})
}

totalPages:any=1

searchOnData(){
  if(this.FromSearchData.valid){

    let ShapeDataFilter={
  "accountId": this.FromSearchData.value.accountId,
  "fromDate": this.FromSearchData.value.fromDate,
  "toDate": this.FromSearchData.value.toDate,
  "criteriaDto": {
    "paginationInfo": {
      "pageIndex": this.pageIndex,
      "pageSize": this.pageSize
    }
  }
}
    
    this._accountsStatementSer.searchAccountsEstatement(ShapeDataFilter).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
      // this.accountData = res;
      // console.log(this.accountData);
      console.log(res);
      const selectedAccount = this.accountData.find(
  (a: any) => a.id == this.FromSearchData.value.accountId
);

      this.summaryList=res.summary

      
// summary
// : 
// totalCredit
// : 
// 2327.61
// totalDebit
// : 
// 0

      this.accountStatement=res.listAccounts.rows.map((item:any)=>{
        return {...item,name:selectedAccount.name}
      })

      this.totalPages = res.listAccounts.totalPages || 1;
      console.log(this.accountStatement)
    })
  }else{
    this.FromSearchData.markAllAsTouched();
  }
}



}
