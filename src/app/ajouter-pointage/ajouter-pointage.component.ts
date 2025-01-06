import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../ajouter-employee/employee.module';
import { PointageService } from '../services/pointage.service';

@Component({
  selector: 'app-ajouter-pointage',
  templateUrl: './ajouter-pointage.component.html',
  styleUrls: ['./ajouter-pointage.component.css']
})
export class AjouterPointageComponent implements OnInit {
  pointageForm!: FormGroup;
  matr!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,    private http: HttpClient,
    private servicepointage: PointageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Retrieve `matr` from route parameters
    this.route.params.subscribe((params) => {
      this.matr = +params['id']; // Convert string to number
      console.log('MATR:', this.matr);
    });

    // Initialize the form
    this.pointageForm = this.fb.group({
      mois: [null, [Validators.required, Validators.min(1), Validators.max(12)]],
      annee: [null, [Validators.required, Validators.min(2000)]],
      ret: [null, [Validators.required, Validators.min(0)]],
      pres: [null, [Validators.required, Validators.min(0)]],
      retEtAut: [null, [Validators.required, Validators.min(0)]],
      absNj: [null, [Validators.required, Validators.min(0)]],
      absCt: [null, [Validators.required, Validators.min(0)]],
      absLt: [null, [Validators.required, Validators.min(0)]],
      absAut: [null, [Validators.required, Validators.min(0)]],
      absPay: [null, [Validators.required, Validators.min(0)]],
      cgAnn: [null, [Validators.required, Validators.min(0)]],
      maPied: [null, [Validators.required, Validators.min(0)]],
      jf: [null, [Validators.required, Validators.min(0)]],
      at: [null, [Validators.required, Validators.min(0)]],
      serv: ['', Validators.required],
      date: ['', Validators.required],
      heuresTravaillees: [null, [Validators.required, Validators.min(0)]],
    });
  }
  goBack(): void {
    this.router.navigate(['/admin/Pointage']);  // Navigate to the specified route
  }
   services = Object.values(Service);
  onSubmit(): void {

      this.servicepointage.ajouterpointage(this.pointageForm.value,this.matr).subscribe(
        (response) => {
          console.log('Pointage ajouté avec succès:', response);
          alert('Pointage ajouté avec succès!');
          this.pointageForm.reset();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du pointage:', error);
          alert('Erreur lors de l\'ajout du pointage.');
        }
      );
  }
}
