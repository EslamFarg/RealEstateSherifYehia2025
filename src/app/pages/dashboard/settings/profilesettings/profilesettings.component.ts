import { Component, DestroyRef, inject } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProfilesettingsService } from './services/profilesettings.service';
import { EditProfileImgService } from '../../../../shared/services/edit-profile-img.service';

@Component({
  selector: 'app-profilesettings',
  templateUrl: './profilesettings.component.html',
  styleUrls: ['./profilesettings.component.scss'],
})
export class ProfilesettingsComponent {
  _profileSettingsServices = inject(ProfilesettingsService);
  _editBahaviourServices = inject(EditProfileImgService);
  _destroyRef = inject(DestroyRef);

  // حالة الرفع
  uploading = false;
  uploadProgress = -1;
  remainingTime = 0;
  private uploadStartTime: number | null = null;

  imgFile: any;
  getDatausers: any = [];

  ngOnInit(): void {
    this.getAllDataUserProfile();
  }

  onFileSelected(e: any) {
    const file: File = e.target.files?.[0];
    if (!file) return;

    // عرض الصورة المؤقتة محليًا
    this.imgFile = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append('Img', file);

    // تهيئة حالة الرفع
    this.uploading = true;
    this.uploadProgress = 0;
    this.remainingTime = 0;
    this.uploadStartTime = Date.now();

    this._profileSettingsServices.EditProfileImg(formData)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            const loaded = event.loaded ?? 0;
            const total = event.total ?? 0;
            const percent = total ? Math.round((100 * loaded) / total) : 0;
            this.uploadProgress = percent;

            // حساب وقت متبقي تقريبي
            if (this.uploadStartTime && total && loaded) {
              const elapsedSec = (Date.now() - this.uploadStartTime) / 1000;
              const rate = loaded / Math.max(elapsedSec, 0.001); // بايت/ثانية
              const remainingBytes = total - loaded;
              this.remainingTime = rate > 0 ? Math.ceil(remainingBytes / rate) : 0;
            }
          } else if (event.type === HttpEventType.Response) {
            const res = event.body; // حسب API لديك قد تحتاج event.body.url أو ما شابه
            // تحديث الـlocalStorage و Behaviour subject كما في كودك
            const payloadStr = localStorage.getItem('payloadUser');
            if (payloadStr) {
              const payload = JSON.parse(payloadStr);
              // افترض أن API يعيد رابط الصورة في res (اضبط بناءً على استجابة API)
              payload.imgUrl = res;
              this._editBahaviourServices.editImg(res);
              localStorage.setItem('payloadUser', JSON.stringify(payload));
            }

            // إعادة جلب بيانات المستخدم لتحديث العرض
            this.getAllDataUserProfile();

            // إعادة حالة الرفع
            this.uploading = false;
            this.uploadProgress = -1;
            this.remainingTime = 0;
            this.uploadStartTime = null;
          }
        },
        error: (err) => {
          // إعادة حالة الرفع عند الخطأ
          this.uploading = false;
          this.uploadProgress = -1;
          this.remainingTime = 0;
          this.uploadStartTime = null;
          // هنا يمكنك اظهار toastr أو رسالة خطأ
        }
      });
  }

  getAllDataUserProfile() {
    this._profileSettingsServices.getDataUserProfile()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((res: any) => {
        this.getDatausers = res;
      });
  }
}
