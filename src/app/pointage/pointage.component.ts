import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PointageService } from '../services/pointage.service';
import { EmployeeService } from '../services/employee.service';
import { Employee, Service } from '../ajouter-employee/employee.module';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

const heuresValidator = (control: AbstractControl) => {
  const value = control.value;
  if (value < 0) return { negative: true }; // Ne pas accepter de valeur négative
  if (value > 16) return { exceedsLimit: true }; // Ne pas dépasser 16 heures
  return null;
};

@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrls: ['./pointage.component.css']
})
export class PointageComponent implements OnInit {
  idpointage:any
copyid(id: any) {
  this.idpointage=id
  this.pointageService.getPointageByid(this.idpointage).subscribe((data=>{
    this.pointageFormupdate.patchValue(data)
  }));
}
services = Object.values(Service);
  @ViewChild('printSection') printSection!: ElementRef;
  pointageForm: FormGroup;
  employees: any[] = [];
  currentDate = new Date();
  searchNom: string = '';
  searchMatricule: string = '';
  showEtat: boolean = false;
  employeesF: Employee[] = [];


  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private pointageService: PointageService,
    private router: Router
  ) {
    this.pointageForm = this.fb.group({
      pointages: this.fb.array([])  // FormArray pour gérer plusieurs pointages
    });
  }
  selectedPointages: any[] = [];

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (employees) => {this.employees = employees;
        console.log(this.employeesF);
        
      },
      (error) => console.error('Erreur lors de la récupération des employés', error)
    );
  }
  updatePointage() {
    this.pointageService.updatePointage(this.idpointage, this.pointageFormupdate.value).subscribe((data) => {
      console.log(data);
      this.getAllEmployees();
  
      // Display success alert
      alert('Pointage updated successfully!');
    }, (error) => {
      // Handle error alert if the request fails
      alert('An error occurred while updating the pointage.');
    });
  }
  
  rechercherParNom(): void {
    if (this.searchNom.trim() === '') {
      this.getAllEmployees(); // Récupère tous les employés si le champ de recherche est vide
    } else {
      this.employeeService.rechercheparnom(this.searchNom).subscribe(
        (employees:any) => this.employees =employees,
        (error) => console.error('Erreur lors de la recherche par nom', error)
      );
    }
  }

  rechercherParMatricule(): void {
    if (this.searchMatricule.trim() === '') {
      this.getAllEmployees(); // Récupère tous les employés si le champ de recherche est vide
    } else {
      this.employeeService.rechercheparmatr(this.searchMatricule).subscribe(
        (employees:any) =>{ 
          this.employees = [];
          this.employees.push(employees)},
        (error) => console.error('Erreur lors de la recherche par matricule', error)
      );
    }
  }
  openModalPointage(pointages: any): void {
    
    this.pointageService.getpointagebymatr(pointages).subscribe((data)=>{
      this.selectedPointages = data;
    })
    console.log(pointages);
    
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  pointageFormupdate!: FormGroup;
  matr!: number;
  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
      console.log(employees);
      
      this.initForm();
    });
    this.getAllEmployees()
  
  // Initialize the form
  this.pointageFormupdate = this.fb.group({
    mois: [null, [Validators.required, Validators.min(1), Validators.max(12)]],
    annee: [null, [Validators.required, Validators.min(2000)]],
    ret: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    pres: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    retEtAut: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    absNj: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    absCt: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    absLt: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    absAut: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    absPay: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    cgAnn: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    maPied: [null, [Validators.required, Validators.min(0)]],
    jf: [null, [Validators.required, Validators.min(0)]],
    at: [null, [Validators.required, Validators.min(0)]],
    serv: ['', Validators.required],
    date: ['', Validators.required],
    heuresTravaillees: [null, [Validators.required, Validators.min(0)]],
  });
  }

  initForm(): void {
    const pointageArray = this.pointageForm.get('pointages') as FormArray;
    this.employees.forEach(employee => {
      const group = this.fb.group({
        matr: [employee.matr],
        Nom_Et_Prenom_Employee: [employee.Nom_Et_Prenom_Employee],
        N_TEL: [employee.N_TEL],
        Service: [employee.Service],
        present: [0, [Validators.required, heuresValidator]],      
        absentNonJustifie: [0, Validators.required],
        Absence: [0, Validators.required],
        absentCourtTerme: [0, Validators.required],
        absentLongTerme: [0, Validators.required],
        absentAut: [0, Validators.required],
        absentPay: [0, Validators.required],
        autorisation: [0, [Validators.required, heuresValidator]],
        retard: [0, [Validators.required, heuresValidator]],
        retardAutorise: [0, [Validators.required, heuresValidator]],
        conge: [0, Validators.required],
        miseAPied: [0, Validators.required],
        jourFerie: [0, Validators.required],
        remarque: [''],
        date: [new Date().toISOString(), Validators.required],
        creationId: [new Date().getTime().toString()],
        modificationTimestamp: [null],
        modificationId: [null],
        nbhtravaille: [0]  // Calcul des heures travaillées à partir des valeurs des autres champs
      });

      pointageArray.push(group);
    });
  }

  get pointages(): FormArray {
    return this.pointageForm.get('pointages') as FormArray;
  }

  onSubmit(): void {
    if (this.pointageForm.valid) {
      const pointages = this.pointageForm.value.pointages.map((pointage: any) => ({
        ...pointage,
        nbhtravaille: pointage.present - pointage.autorisation
      }));
  
     
    } else {
      alert('Veuillez corriger les erreurs dans le formulaire.');
    }
  }
  

  // Méthode pour importer un fichier
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = reader.result as string;
        // Traitez le contenu du fichier ici
        console.log(fileContent);
      };

      reader.readAsText(file); // Ou utilisez readAsBinaryString si nécessaire
    }
  }

  filteredPointages(): any[] {
    return this.pointages.controls.filter(pointage => {
      const nom = pointage.get('NomETPrenom')?.value();
      const matricule = pointage.get('matr')?.value.toString();
      return (
        (!this.searchNom || nom.includes(this.searchNom.toLowerCase())) &&
        (!this.searchMatricule || matricule.includes(this.searchMatricule))
      );
    });
  }

  // Méthode pour naviguer vers un autre détail d'un employé
  autres(nomEtPrenom: string, matr: number): void {
    this.router.navigate(['/admin/autres', nomEtPrenom, matr]);
  }
  openAjouterPointage(matr: number): void {
    // Populate the form with default values or existing employee data
   this.router.navigate(['/admin/ajouter-pointage', matr]);
  }
  // Impression de la section
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