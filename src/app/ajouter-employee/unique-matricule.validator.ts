import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export function uniqueMatrValidator(employeeService: EmployeeService): AsyncValidatorFn {
  return (control: AbstractControl): any => {
    if (!control.value) {
      return of(null); // Ne rien faire si le champ est vide
    }

    return employeeService.checkMatrExists(control.value).pipe(
      map((exists: boolean) => (exists ? { matrExists: true } : null)),
      catchError(() => of(null)) // Gère les erreurs d'API
    );
  };
}
