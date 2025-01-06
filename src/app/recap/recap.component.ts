import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PointageService } from '../services/pointage.service';



@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {
  @ViewChild('printSection') printSection!: ElementRef;

  selectedState?: string; // Sélection de l'état (absence/autorisation)
  selectedYear?: number;  // Sélection de l'année
  years: number[] = [];   // Liste des années disponibles
  months: string[] = [    // Mois de l'année
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  filteredServices: any[] = []; // Contient les services filtrés

  constructor(private pointageService: PointageService ) {
    this.populateYears();
  }
  year: number = 2020; // Default year
  state: string = 'PRESENT'; // Default state
  pointageData: any[] = []; // Holds the result from the backend
  isLoading = false;
  getPointageData() {
    this.isLoading = true;
    this.pointageService.calculatePointage(this.year, this.state).subscribe({
      next: (data) => {
        this.pointageData = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching data', error);
        this.isLoading = false;
      }
    });
  }
  ngOnInit(): void {}

  populateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 5; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  onSubmit(): void {
    if (this.selectedState && this.selectedYear) {
      this.filteredServices = this.getFilteredServices(this.selectedState, this.selectedYear);
    }
  }

  getFilteredServices(state: string, year: number): any[] {
    // Simulez des données. Remplacez cette logique par un appel API réel.
    const allServices = [
      { name: 'D_CABL', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'D_CINT', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'D_MENUIS', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'D_PEINT', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'D_DEB', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'D_PONC', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'D_PRINT', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'D_RINC', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'D_SOUD', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'IND_ADMIN', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'IND_BUR_ETUD', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'IND_CABL', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'IND_CINT', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'IND_DES', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'IND_DEVL', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'IND_MAGAS', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'IND_MAINT', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'IND_PEINT', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'IND_PROD', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'IND_QUAL', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'IND_SOUD', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'SERV_GENE', monthlyData: this.mockMonthlyData(state, year) },   
    ];
    return allServices;
  }

  mockMonthlyData(state: string, year: number): any {
    // Génère des données factices par mois
    return this.months.reduce((acc: any, month: string) => {
      acc[month] = state === 'absence' ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * 5);
      return acc;
    }, {});
  }

  getMonthlyData(service: any, month: string): number | string {
    return service.monthlyData[month] || '-';
  }

  printPage(): void {
    setTimeout(() => {
      if (this.printSection) {
        const printContent = this.printSection.nativeElement.innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
      } else {
        console.error('La section à imprimer est introuvable.');
      }
    }, 0);
  }
}