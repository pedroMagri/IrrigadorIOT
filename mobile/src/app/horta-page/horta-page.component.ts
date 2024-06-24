import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { Subscription, interval } from 'rxjs';
import { format } from 'date-fns/format';
import { HortaService } from '../services/horta.service';

@Component({
  selector: 'app-horta-page',
  standalone: true,
  imports: [CommonModule, ChartModule, TableModule],
  templateUrl: './horta-page.component.html',
  styleUrl: './horta-page.component.scss'
})
export class HortaPageComponent {
  hortaService = inject(HortaService)

  sensorData: any = [];
  lastSensorData: any = null;
  data: any;
  verticalOptions: any;
  horizontalOptions: any;
  subscription: Subscription | undefined;

  ngOnInit(): void {
    this.fetchData();
    this.subscription = interval(30000).subscribe(() => this.fetchData());
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchData(): void {
    this.hortaService.getSensorData().subscribe(data => {
      this.sensorData = data;
      this.setupChartData();
    });
  }

  getFormattedTimestamp(): string {
    if (!this.lastSensorData) {
      return '';
    }
    return format(new Date(this.lastSensorData.createdAt), 'dd/MM/yyyy | HH:mm:ss');
  }

  setupChartData(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const getColor = (value: number) => value < 60 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(54, 162, 235, 0.2)';
    const getBorderColor = (value: number) => value < 60 ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)';

    this.data = {
      labels: this.sensorData.map((entry: { createdAt: Date; }) => new Date(entry.createdAt).toLocaleString()),
      datasets: [
        {
          label: 'Umidade do Solo',
          data: this.sensorData.map((entry: { soilMoisturePercentage: any; }) => entry.soilMoisturePercentage),
          backgroundColor: this.sensorData.map((entry: { soilMoisturePercentage: number; }) => getColor(entry.soilMoisturePercentage)),
          borderColor: this.sensorData.map((entry: { soilMoisturePercentage: number; }) => getBorderColor(entry.soilMoisturePercentage)),
          fill: false,
        }
      ],
    };

    this.horizontalOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }

      }
    };
    if (this.sensorData.length > 0) {
      this.lastSensorData = this.sensorData[this.sensorData.length - 1];
      this.lastSensorData.createdAt = this.getFormattedTimestamp();
    }
  }
}
