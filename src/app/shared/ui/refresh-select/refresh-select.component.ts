import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-refresh-select',
  templateUrl: './refresh-select.component.html',
  styleUrl: './refresh-select.component.scss',
  standalone: true,
  imports: [NgSelectModule, ɵInternalFormsSharedModule,ReactiveFormsModule],
})
export class RefreshSelectComponent {
  @Input() titleLabel: string = '';
  @Input() dataItems: any = [];
  @Input() bindLabel:any;
  @Input() bindValue:any;
  @Input() fc!:FormControl
  @Output() selectedData = new EventEmitter();
  @Input() isMultiSelect:boolean=false

  // searchHandler = input<(name:string) => void>(() => ({}));
  refreshPage() {
    location.reload();
  }

  

  OnDataSelect(data: any) {
    this.selectedData.emit(data);
    // console.log(data);
  }
}
