import { Component, inject } from '@angular/core';
import { ToastrService } from './services/toastr.service';


@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrl: './toastr.component.scss',
  standalone:true
})
export class ToastrComponent {
   toaster:ToastrService=inject(ToastrService);
   

   
}
