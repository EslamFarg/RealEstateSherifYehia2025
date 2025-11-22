import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfilesettingsService } from '../services/profilesettings.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  // !!!!!!!!!!!!!!!!!!!!!!!!! Services

  fb: FormBuilder = inject(FormBuilder);
  destroyref: DestroyRef = inject(DestroyRef);
  _profileSettingsServices: ProfilesettingsService = inject(
    ProfilesettingsService
  );
  toastr: ToastrService = inject(ToastrService);

  // !!!!!!!!!!!!!!!!!!!!!!!!!! Property

  profileData: any = this.fb.group({
    fullName: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required]],
    emailConfirmed: [true, [Validators.required]],
    groupName: ['', [Validators.required]],
  });

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! methods

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.getAllDataProfile();
  }

  onSubmit() {
    if (
      this.profileData.get('fullName').valid &&
      this.profileData.get('phoneNumber').valid
    ) {
      let data = {
        fullName: this.profileData.value.fullName,
        phone: this.profileData.value.phoneNumber,
      };

      this._profileSettingsServices
        .EditUserData(data)
        .pipe(takeUntilDestroyed(this.destroyref))
        .subscribe((res: any) => {
          this.toastr.show('تم التعديل بنجاح', 'success');
          this.getAllDataProfile();
        });
    } else {
      this.profileData.markAllAsTouched();
    }
  }

  getAllDataProfile() {
    this._profileSettingsServices
      .getDataUserProfile()
      .pipe(takeUntilDestroyed(this.destroyref))
      .subscribe((res: any) => {
        const groups =
          res.groups?.map((g: any) => g.groupName).join(' , ') || '';
        this.profileData.patchValue({
          fullName: res.fullName,
          phoneNumber: res.phoneNumber,
          groupName: groups,
        });
      });
  }
}
