import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Employee } from '../ajouter-employee/employee.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  //private baseUrl = 'http://localhost:3000/employees';
   private baseUrl = environment.baseUrl+'/employees';

  constructor(private http: HttpClient) {}

  getEmployeeByMatricule(matr: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${matr}`);
  }

  ajoutEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl+"/add", employee);
  }

  modifierEmployee(matr: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/update/${matr}`, employee,{responseType: 'text' as 'json'});
  }

  supprimerEmployee(employeematr: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${employeematr}`,{responseType: 'text' as 'json'});
  }

  deleteEmployeeByNom(employeenom: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/nom/${employeenom}`); // Utilisation de `nom` comme exemple
  }

  rechercherParNom(nom: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl).pipe(
      map((employees: Employee[]) =>
        employees.filter(emp => emp.nomEtPrenom.toLowerCase().includes(nom.toLowerCase()))
      )
    );
  }

  rechercheparmatr(matricule: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl+"/"+matricule)
     
  }
  rechercheparnom(nom: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl+"/bynom/"+nom)
    
  }

  checkUniqueMatricule(matr: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check-matricule/${matr}`);
  }

  checkUniqueNomCIN(nom: string, cin: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check-nom-cin?nom=${nom}&cin=${cin}`);
  }

  uniqueMatriculeValidator(): ValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkUniqueMatricule(control.value).pipe(
        map(isUnique => (isUnique ? null : { uniqueMatricule: true }))
      );
    };
  }

  uniqueNomCINValidator(nomControl: AbstractControl, cinControl: AbstractControl): ValidatorFn {
    return (): Observable<ValidationErrors | null> => {
      return this.checkUniqueNomCIN(nomControl.value, cinControl.value).pipe(
        map(isUnique => (isUnique ? null : { uniqueNomCIN: true }))
      );
    };
  }

  getMonthlySummaries(matr: number): Observable<{ month: string, present: number, absent: number, authorized: number }[]> {
    return this.http.get<{ month: string, present: number, absent: number, authorized: number }[]>(
      `http://localhost:3001/pointages/${matr}/monthly-summaries`
    );
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl+"/all");
  }

  saveAttendance(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/attendance`, data);
  }
  checkMatrExists(matr: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check-matr/${matr}`);
  }
}