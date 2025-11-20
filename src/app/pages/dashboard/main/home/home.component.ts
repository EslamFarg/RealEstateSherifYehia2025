import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  ChartConfiguration,
  ChartData,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
Chart.register(
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  render: Renderer2 = inject(Renderer2);
  constructor() {}

  ngAfterViewInit(): void {}
  showMonth = false;
  showweek = false;

  @ViewChild('month') month!: ElementRef<HTMLInputElement>;
  @ViewChild('week') week!: ElementRef<HTMLInputElement>;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  public barChartType = 'bar' as const;

  public barChartData: ChartData<'bar'> = {
    labels: [
      '2006',
      '2007',
      '2008',
      '2009',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
    ],
    datasets: [
      {
        data: [25, 30, 40, 56, 80, 55, 40, 30, 20],
        backgroundColor: [
          '#C9C9C9',
          '#FFA6F9',
          '#C9C9C9',
          '#B3A5F1',
          '#99DBFF',
          '#C9C9C9',
          '#C9C9C9',
          '#C9C9C9',
          '#C9C9C9',
        ],
        barThickness: 25, 
        maxBarThickness: 25,
      },
    ],
  };
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
