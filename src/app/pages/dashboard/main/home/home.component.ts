import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  ChartConfiguration,
  ChartData,
  Legend,
  LinearScale,
  PieController,
  Tooltip,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HomeService } from './services/home.service';
import { Home } from './interfaces/home';
Chart.register(
  BarElement,
  BarController,
  PieController,
  ArcElement,
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
export class HomeComponent implements AfterViewInit {
  render: Renderer2 = inject(Renderer2);
  _homeService: HomeService = inject(HomeService);
  homeObj: Home = {
    customersCount: 0,
    ownersCount: 0,
    propertiesCount: 0,
    contractsCount: 0,
    activeContractsCount: 0,
    expiredContractsCount: 0,
    latePaymentsCount: 0,
    terminatedContractsCount: 0,
  };
  ngAfterViewInit(): void {
    this.getDashboardData();
  }
  getDashboardData() {
    this._homeService.getDashboard().subscribe({
      next: (res: Home) => {
        this.homeObj = res;

        // update chart data (replace object/datasets so change detection notices)
        this.pieChartData = {
          labels: this.pieChartLabels, // or set directly in-line
          datasets: [
            {
              data: [
                this.homeObj.activeContractsCount,
                this.homeObj.expiredContractsCount,
                this.homeObj.terminatedContractsCount,
              ],
              backgroundColor: ['#99DBFF', '#B3A5F1', '#C9C9C9'],
            },
          ],
        };

        // ask the chart to update (if viewchild available)
        this.chart?.update();
      },
    });
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'pie'> | undefined;

  // public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
  //   scales: {
  //     x: {
  //       grid: {
  //         display: false,
  //       },
  //       // x axis is hidden
  //       ticks: {
  //         display: false,
  //       },
  //     },
  //     y: {
  //       grid: {
  //         display: false,
  //       },
  //       // y axis is hidden
  //       ticks: {
  //         display: false,
  //       },
  //     },
  //   },
  //   plugins: {
  //     legend: {
  //       display: true,
  //       position: 'right',
  //       labels: {
  //         font: {
  //           size: 14,
  //         },
  //         usePointStyle: true,
  //         pointStyle: 'circle',
  //         padding: 20,
  //       },
  //     },
  //   },

  //   elements: {
  //     arc: { borderWidth: 0 },
  //   },
  // };
public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        font: {
          size: 14,
        },
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 20,
      },
    },
  },
  elements: {
    arc: { borderWidth: 0 },
  },
};

  public pieChartLabels: string[] = [
    'العقود النشطة',
    'العقود المنتهية',
    'العقود الملغية',
  ];
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{ data: [0, 0, 0] }],
  };

  public pieChartType: string = 'pie';
}
