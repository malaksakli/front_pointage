import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../connexion/User.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.baseUrl;  // JSON Server endpoint

// private apiUrl = 'http://localhost:3002/auth';  // JSON Server endpoint
private currentUser: User | null = null; // Stocke l'utilisateur actuel

constructor(private http: HttpClient) {
  // Essayer de récupérer l'utilisateur du localStorage au démarrage
  const storedUser = localStorage.getItem('currentUser');
  this.currentUser = storedUser ? JSON.parse(storedUser) : null;
}

// Méthode de connexion
login(username: string, password: string): Observable<User> {

  return this.http.post<User>(this.apiUrl+"/auth/login", { username,password })
  
  
}
//ajouter utlisateur 
addUser(userData: { username: string; password: string },roleName:string): Observable<any> {
  return this.http.post(this.apiUrl+"/users/add?roleName="+roleName, userData, {responseType: 'text' as 'json'});
}
 // Récupérer un utilisateur par son ID
 getUserById(userId: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/users/${userId}`);
}

// Mettre à jour un utilisateur
updateUser(userId: string, updatedUser: { username: string; password: string;  },role: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/users/update/${userId}/${role}`, updatedUser , {responseType: 'text' as 'json'});
}
// Récupérer tous les utilisateurs
getUsers(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl+"/users/all");
}

// Supprimer un utilisateur
deleteUser(userId: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/users/delete/${userId}`, {responseType: 'text' as 'json'});
}
 

getCurrentUser(): Observable<User | null> {
  // Retourne l'utilisateur actuel, vérifie s'il est stocké
  return of(this.currentUser);
}

// Vérifiez si l'utilisateur est un administrateur
isAdmin(user: any): boolean {
  
  user=JSON.parse(localStorage.getItem('user')!);
  console.log(user);
  return user?.role?.some((role:any) => role.name === 'ROLE_ADMIN') ?? false;
}
isUser(user: any): boolean {
   
  user=JSON.parse(localStorage.getItem('user')!);
  console.log(user);
  return user?.role?.some((role:any) => role.name === 'ROLE_USER') ?? false;
  

}




logout(): void {
  this.currentUser = null; // Réinitialise l'utilisateur courant
  localStorage.removeItem('currentUser'); // Supprime l'utilisateur du localStorage
}
resetPassword(username: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/reset-password`, { username });
}
}