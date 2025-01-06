import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Chef, Classe, Employee, EtatCivil, Genre, ModePaiement, Service, TypeContrat } from '../ajouter-employee/employee.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modifier-employee',
  templateUrl: './modifier-employee.component.html',
  styleUrls: ['./modifier-employee.component.css']
})
export class ModifierEmployeeComponent implements OnInit {
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {
 
  }

  ngOnInit(): void {
    // Fetch the employee by matricule
    const matr = Number(this.route.snapshot.paramMap.get('matr'));
    this.employeeService.getEmployeeByMatricule(matr).subscribe((employe) => {
      this.employe = employe;
      console.log(employe);
      
      this.employeForm.patchValue(employe);
    });
       // Initialize the reactive form
       this.employeForm = this.fb.group({
        matr: [{ value: '', disabled: true }, Validators.required],
        nomEtPrenom: ['', Validators.required],
        nomEtPrenomPere: ['', Validators.required],
        ntel: ['', [Validators.required, Validators.pattern(/^\d{8,15}$/)]],
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
        anc: [{ value: '', disabled: true }],
        test: [false],
        FinContr: ['', Validators.required],
        alerte: [0],
        remarque: [''],
        bank: ['', Validators.required],
        rib: ['', [Validators.required, Validators.pattern(/^\d{20}$/)]],
        Age: [{ value: '', disabled: true }],
        nbEnf: ['', [Validators.required, Validators.min(0)]],
        domiciIrreSalaire: [false],
        quitteLe:  [Date],
      });
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

  // Submit the form
  onSubmit(): void {
 
    
      this.employeeService.modifierEmployee(this.employe.matr, this.employeForm.value).subscribe((data) => {
          alert('Les modifications ont été enregistrées avec succès !');
          this.successMessage = 'Les modifications ont été enregistrées avec succès !';
          this.errorMessage = '';
      
        },
        (error)=> {
          alert('Il y a eu une erreur lors de l\'enregistrement des modifications.');
          console.log(error);
          this.successMessage = '';
        }
      );
    
  }

  // Navigate back to the employee list
  retour(): void {
    this.router.navigate(['/admin/liste-employee']);
  }
}