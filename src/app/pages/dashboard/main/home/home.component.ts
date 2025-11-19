import { Component, ElementRef, inject, Renderer2, ViewChild} from '@angular/core';
// import { ChartType , ChartConfiguration } from 'chart.js';/
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class HomeComponent  {
  render:Renderer2=inject(Renderer2);
 constructor() {
    // لازم نسجل الـ registerables مرة واحدة
    Chart.register(...registerables);
  }

    ngAfterViewInit(): void {
    const ctx = document.getElementById('myBarChart') as HTMLCanvasElement;

    const config: ChartConfiguration = {
      type: 'bar' as ChartType,
      data: {
        labels: [2024,2023,2022,2021,2020,2019,2018,  2017,2016,2015],
        datasets: [
          {
            label: 'المبيعات',
            data: [65, 59, 80, 81, 56],
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          },
          {
            label: 'المصاريف',
            data: [28, 48, 40, 19, 86],
            backgroundColor: 'rgba(255, 99, 132, 0.6)'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'مقارنة المبيعات والمصاريف'
          }
        }
      }
    };

    new Chart(ctx, config);
  }
  showMonth = false;
  showweek = false;

  @ViewChild('month') month!: ElementRef<HTMLInputElement>;
  @ViewChild('week') week!: ElementRef<HTMLInputElement>;

  changeClender(type: string) {
    if (type === 'month') {
      this.showMonth = true;
      this.showweek = false;
    } else if (type === 'week') {
      this.showweek = true;
      this.showMonth = false;
    }
  }

  openCalendar() {
    if (this.showMonth) {
        this.month.nativeElement.showPicker?.(); // Chrome >= 93 يدعمها
      this.month.nativeElement.focus();
      // this.month.nativeElement.click();   // يفتح input month
    } else if (this.showweek) {
        this.week.nativeElement.showPicker?.(); // Chrome >= 93 يدعمها
      this.week.nativeElement.focus();
    }
  }







}
