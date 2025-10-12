import { Component, Input } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-refresh-select',
  templateUrl: './refresh-select.component.html',
  styleUrl: './refresh-select.component.scss',
  standalone:true,
  imports:[NgSelectModule]
})
export class RefreshSelectComponent {

  @Input() titleLabel:string='';
refreshPage(){
  location.reload();
}
}
