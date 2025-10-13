import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-emptytable',
  templateUrl: './emptytable.component.html',
  styleUrl: './emptytable.component.scss'
})
export class EmptytableComponent {
@Input() countCol:number=1
}
