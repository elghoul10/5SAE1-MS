import {
  Component,
  ViewEncapsulation,
  OnInit,
  ElementRef,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { ClubService } from './../../manage-club/services/club.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent implements OnInit {
  totalEarning: number[] = [];
  monthlyRevenue: number[] | undefined;

  constructor(
    private elementRef: ElementRef,
    private clubService: ClubService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = params['id']; // 'id' correspond au nom du paramètre dans l'URL
      this.fetchMonthlyRevenue(userId);
    });
  }

  async fetchMonthlyRevenue(userId: number): Promise<void> {
    try {
      if (this.monthlyRevenue) {
        this.totalEarning = this.monthlyRevenue.slice(0, 12); // Utiliser les 12 premières valeurs pour totalEarning
        console.log('Contenu de totalEarning :', this.totalEarning);
        this.generateRevenueChart(); // Générer le graphique une fois les données chargées
      } else {
        console.error('Données de revenu mensuel non disponibles');
      }
    } catch (error) {
      console.error(
        'Erreur lors de la récupération du revenu mensuel :',
        error
      );
    }
  }

  generateRevenueChart(): void {
    const canvas = this.elementRef.nativeElement.querySelector('.line-graph');
    if (!canvas) {
      console.error('Élément canvas introuvable');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Impossible d'obtenir le contexte du canvas");
      return;
    }

    if (!this.monthlyRevenue) {
      console.error('Données de revenu mensuel non disponibles');
      return;
    }

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
        datasets: [
          {
            label: 'Earnings',
            data: this.totalEarning,
            borderColor: 'rgba(255,117,92,1)',
            pointBorderColor: 'rgba(255,255,255,1)',
            pointBackgroundColor: 'rgba(255,255,255,1)',
            borderWidth: 3,
            fill: false,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            grid: {
              display: false,
            },
            ticks: {
              padding: 12,
              callback: function (value: string | number) {
                return value + ' TND';
              },
            },
          },
          x: {
            ticks: {
              padding: 12,
            },
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
}
