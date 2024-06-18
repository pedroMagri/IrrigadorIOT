import { Component, inject } from '@angular/core';
import { HortaService } from '../services/horta.service';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-horta-page',
  standalone: true,
  imports: [ChartModule, TableModule],
  templateUrl: './horta-page.component.html',
  styleUrl: './horta-page.component.scss'
})
export class HortaPageComponent {
  hortaService = inject(HortaService)

  sensorData: any = [];
  data: any;
  verticalOptions: any;
  horizontalOptions: any;

  ngOnInit(): void {
    this.hortaService.getSensorData().subscribe(data => {
      this.sensorData = data;
      this.setupChartData();
    });
  }

  setupChartData(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: this.sensorData.map((entry: { timestamp: string | number | Date; }) => new Date(entry.timestamp).toLocaleString()),
      datasets: [
        {
          label: 'ID',
          data: this.sensorData.map((entry: { id: any; }) => entry.id),
          borderColor: 'blue',
          fill: false,
        },
        {
          label: 'Umidade do Solo',
          data: this.sensorData.map((entry: { soilMoisturePercentage: any; }) => entry.soilMoisturePercentage),
          borderColor: 'blue',
          fill: false,
        },
        {
          label: 'Úmido (Sim/Não)',
          data: this.sensorData.map((entry: { moistured: any; }) => entry.moistured),
          borderColor: 'blue',
          fill: false,
        },
        {
          label: 'Data e hora',
          data: this.sensorData.map((entry: { timestamp: any; }) => entry.timestamp),
          borderColor: 'yellow',
          fill: false,
        }
      ],
    };

    this.verticalOptions = {
      indexAxis: 'y',
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
  }
}
