import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../ajouter-employee/employee.module';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { EtatPointageMonthly } from '../pointage/EtatPointageMonthly .module';
import { PointageService } from '../services/pointage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-fiche-suivite',
  templateUrl: './fiche-suivite.component.html',
  styleUrls: ['./fiche-suivite.component.css']
})
export class FicheSuiviteComponent implements OnInit {
  @ViewChild('printSection') printSection!: ElementRef;
  selectedEmployee?: any;
  alert: number = 0;
  etatPointagesMonthly: EtatPointageMonthly[] = [];
  filteredEtatPointagesMonthly: EtatPointageMonthly[] = [];
  selectedYear!: number;
  selectmois!: number;
  years: number[] = [];
  selectedEmpl: any
  mois: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceauth: AuthService,
    private employeeService: EmployeeService,
    private pointageService: PointageService
  ) {}
  matr:any
  isAdmin!:boolean
  user:any
  ngOnInit(): void {
    const matrStr = this.route.snapshot.paramMap.get('matr');
     this.matr = matrStr ? Number(matrStr) : NaN;
     this.user= JSON.parse(String(localStorage.getItem('user')));
     this.isAdmin = this.serviceauth.isAdmin(this.user);
      // Initialiser l'année et le mois actuels
    const currentDate = new Date();
    this.selectedYear = currentDate.getFullYear();
    this.selectmois = currentDate.getMonth() + 1; // Les mois commencent à 0 dans JavaScript, donc +1

    // Charger les années (vous pouvez ajuster cette logique selon vos besoins)
    this.years = [this.selectedYear - 1, this.selectedYear, this.selectedYear + 1];

    // Charger les données par défaut
    this.getTotalEtatPointageMensuel();

    if (!isNaN(this.matr)) {
      // Récupération des détails de l'employé
      this.employeeService.getEmployeeByMatricule(this.matr).subscribe(
        (employee) => {
          this.selectedEmployee = employee;
          console.log('Employé récupéré :', this.selectedEmployee.pointages);
          
          if (this.selectedEmployee && this.selectedEmployee.FinContr) {
            this.calculateAlert(this.selectedEmployee.FinContr); // Calcul de l'alerte de fin de contrat
          }
          this.loadPointages(this.matr ); // Chargement des états de pointage
        },
        (error) => {
          console.error("Erreur lors de la récupération des détails de l'employé", error);
        }
      );
  
      const currentYear = new Date().getFullYear();
      this.years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];
    }
  }
 // Cette méthode est appelée lorsque l'utilisateur change l'année ou le mois
 onYearChange(): void {
  this.getTotalEtatPointageMensuel();
}

onMonthChange(): void {
  this.getTotalEtatPointageMensuel();
}

getTotalEtatPointageMensuel(): void {
  // Utiliser selectedYear et selectmois pour appeler le service avec l'année et le mois sélectionnés
  this.pointageService.getTotalEtatPointageMensuel(this.matr, this.selectmois, this.selectedYear).subscribe(
    (data) => {
      this.selectedEmpl = data;
      console.log(this.selectedEmpl);
    },
    (error) => {
      console.error('Erreur lors de la récupération des employés', error);
    }
  );
}

  loadPointages(matr: number): void {
    // this.pointageService.getPointagesMensuels(matr, this.selectedYear).subscribe(
    //   (etatPointagesMonthly) => {
    //     this.etatPointagesMonthly = etatPointagesMonthly;
    //     this.filteredEtatPointagesMonthly = this.etatPointagesMonthly; // Filtrage si nécessaire
    //   },
    //   (error) => {
    //     console.error('Erreur lors de la récupération des états de pointage mensuels', error);
    //   }
    // );
  }
  

  // onYearChange(): void {
  //   if (this.selectedEmployee?.matr) {
  //     this.loadPointages(this.selectedEmployee.matr);
  //   }
  // }

  calculateAlert(finContrat: Date): void {
    const finContratDate = new Date(finContrat);
    const currentDate = new Date();
    const diffDays = Math.floor((finContratDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    this.alert = diffDays <= 30 ? 1 : 0;
  }

  retour(): void {
    this.router.navigate(['/admin/liste-employee']);
  }
  //impression
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