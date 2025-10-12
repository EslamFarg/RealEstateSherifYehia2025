  import { NgFor } from '@angular/common';
  import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';

  @Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss',
    imports:[NgFor],
    standalone:true,
  })
  export class PaginationComponent {

    @Input() totalPages: number = 1;
    @Input() currentPage: number = 1;

    @Output() pageChange = new EventEmitter<number>();
    @ViewChildren('pageItem') pageItems!: QueryList<ElementRef>;
    


ngAfterViewInit(): void {
  //Called after every check of the component's view. Applies to components only.
  //Add 'implements AfterViewChecked' to the class.
      this.scrollToActive();
}
    goToPage(page: number) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.pageChange.emit(page);
         this.scrollToActive();
      }
         

    }


      next() {
      this.goToPage(this.currentPage + 1);
        this.scrollToActive();
    }

    previous() {
      this.goToPage(this.currentPage - 1);
       this.scrollToActive();
    }


    pages(): number[] {
      return Array(this.totalPages).fill(0).map((_, i) => i + 1);
    }


     scrollToActive() {
    setTimeout(() => {
      const active = this.pageItems.find((el, idx) => idx + 1 === this.currentPage);
      active?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        inline: 'center', // يخليه في النص
        block: 'nearest'
      });
    }, 50);
  }
  }
