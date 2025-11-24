import { NgClass } from '@angular/common';
import { Component, DestroyRef, ElementRef, EventEmitter, HostListener, inject, Input, Output, output, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
// import { SendUserService } from '../../../../shared/services/settings/send-user.service';
import { Subscription } from 'rxjs';
import { ProfilesettingsService } from '../../../pages/dashboard/settings/profilesettings/services/profilesettings.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EditProfileImgService } from '../../services/edit-profile-img.service';
// import { ToastrService } from '../../../../shared/services/toastr.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone:false,
  // imports:[]
})
export class HeaderComponent {

  _profilesettings:ProfilesettingsService=inject(ProfilesettingsService);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Property
  ShowDropDown=false;


  @Input() fullWidthMode=false;
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  _profileSettingsServices:ProfilesettingsService=inject(ProfilesettingsService)
  payloadUser=JSON.parse(localStorage.getItem('payloadUser')!);
  _EditProfileBehaviorService:EditProfileImgService=inject(EditProfileImgService)
 
  router:Router=inject(Router);
  _destroyRef:DestroyRef=inject(DestroyRef);
  getDataUser:any

  @HostListener('document:click',['$event'])

    clickout(event:any){
  //  if(!event.target.classList.contains('drop_down_profile')){
  //   this.ShowDropDown=false;
  //  }

  // //console.log( );

  if(!event.target.closest('.drop_down_profile')){
    this.ShowDropDown=false;
  }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._EditProfileBehaviorService.editObs.subscribe((res)=>{
      this.payloadUser.imgUrl=res
    })
  }





  // ngOnInit(){
  //   this.getAllDataUserImg()
  // }


  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
    //console.log(this.fullWidthMode)
  }


  // getAllDataUserImg(){

  //   this._profileSettingsServices.getDataUserProfile().pipe(takeUntilDestroyed(this._destroyRef)).subscribe((res:any)=>{
  //     //console.log(res);
  //     this.getDataUser=res;
    
  //   })
  // }

  showAndHideSidebar(){

    this.toggleSidebarForMe.emit(false);

  }



  logout(){
    localStorage.removeItem('payloadUser');
    this.router.navigate(['/auth']);
  }

  // getImg(){

  // }
}
