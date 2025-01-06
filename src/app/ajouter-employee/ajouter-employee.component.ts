import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { Chef, Classe, Employee, EtatCivil, Genre, ModePaiement, Service, TypeContrat } from './employee.module';
import { uniqueMatrValidator } from './unique-matricule.validator';

@Component({
  selector: 'app-ajouter-employee',
  templateUrl: './ajouter-employee.component.html',
  styleUrls: ['./ajouter-employee.component.css']
})
export class AjouterEmployeeComponent implements OnInit {
    successMessage: string = '';
    errorMessage: string = '';
    employeForm!: FormGroup;
    employe!: Employee;
  
    // Enum values for dropdowns
    chefs = Object.values(Chef);
    classes = Object.values(Classe);
    services = Object.values(Service);
    genres = Object.values(Genre);
    etatsCivil = Object.values(EtatCivil);
    modesPaiement = Object.values(ModePaiement);
    typesContrat = Object.values(TypeContrat);
  @ViewChild('printSection') printSection!: ElementRef;
  test: string = ''; 
  employeeForm!: FormGroup;


  constructor(private router: Router, private fb: FormBuilder, private service: EmployeeService) {}

  ngOnInit(): void {
    this.employeForm = this.fb.group({
      matr: ['', [Validators.required], [uniqueMatrValidator(this.service)]],
      nomEtPrenom: ['', Validators.required],
      nomEtPrenomPere: ['', Validators.required],
      ntel: ['', [Validators.required,  Validators.pattern('^[0-9]{8,11}$')]],
      cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      taille: ['', [Validators.required, Validators.min(0)]],
      pointure: ['', [Validators.required, Validators.min(0)]],
      DateNais: ['', Validators.required],
      sf: ['', Validators.required],
      etat: ['', Validators.required],
      classe: ['', Validators.required],
      nomDeChef: ['', Validators.required],
      serv: ['', Validators.required],
      typeDeContrat: ['', Validators.required],
      modePay: ['', Validators.required],
      DateRecr: [Date, Validators.required],
      anc: ['', [Validators.required, Validators.min(0)]],
      test: [false],
      FinContr: ['', Validators.required],
      alerte: [0],
      remarque: [''],
      bank: ['', Validators.required],
      rib: ['', [Validators.required, Validators.pattern(/^\d{20}$/)]],
      Age: [{ value: '', disabled: true }],
      nbEnf: ['', [Validators.required, Validators.min(0)]],
      domiciIrreSalaire: [false],
      quitteLe: ['']
    });
  }

  ajouterEmployee(): void {
   
      const employe: Employee = this.employeForm.value;
      this.service.ajoutEmployee(employe).subscribe(() => {
        console.log('Employé ajouté avec succès');
        this.router.navigate(['/admin/liste-employee']);
      }, error => {
        console.error('Erreur lors de l\'ajout de l\'employé :', error);
      });
   
  }
  retour(): void {
    this.router.navigate(['/admin/liste-employee']);
  }
   // Calculate age based on the date of birth
   calculateAge(): void {
    const dateNais = this.employeForm.get('DateNais')?.value;
    if (dateNais) {
      const birthDate = new Date(dateNais);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      this.employeForm.get('Age')?.setValue(age);
    }
  }

  private isOnlyLetters(input: string): boolean {
    const pattern = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    return pattern.test(input);
  }

  private getEnumValues(enumObj: any): Array<{ key: string, value: string }> {
    return Object.keys(enumObj).map(key => ({ key, value: enumObj[key] }));
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