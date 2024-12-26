import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../connexion/User.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private apiUrl = 'http://localhost:3002/auth';  // JSON Server endpoint
private currentUser: User | null = null; // Stocke l'utilisateur actuel

constructor(private http: HttpClient) {
  // Essayer de récupérer l'utilisateur du localStorage au démarrage
  const storedUser = localStorage.getItem('currentUser');
  this.currentUser = storedUser ? JSON.parse(storedUser) : null;
}

// Méthode de connexion
login(username: string, password: string): Observable<User | null> {
  const params = new HttpParams().set('username', username).set('password', password);

  return this.http.get<User[]>(this.apiUrl, { params }).pipe(
    map(users => {
      if (users.length > 0) {
        this.currentUser = users[0]; // Enregistre l'utilisateur s'il est trouvé
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser)); // Stocker l'utilisateur
        return this.currentUser;
      } else {
        return null; // Aucun utilisateur trouvé
      }
    }),
    catchError((error) => {
      console.error('Erreur de connexion', error);
      return of(null); // En cas d'erreur, retourne null
    })
  );
}
//ajouter utlisateur 
addUser(userData: { username: string; password: string; role: string }): Observable<any> {
  return this.http.post(this.apiUrl, userData);
}
 // Récupérer un utilisateur par son ID
 getUserById(userId: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/${userId}`);
}

// Mettre à jour un utilisateur
updateUser(userId: string, updatedUser: { username: string; password: string; role: string }): Observable<any> {
  return this.http.put(`${this.apiUrl}/${userId}`, updatedUser);
}
// Récupérer tous les utilisateurs
getUsers(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}

// Supprimer un utilisateur
deleteUser(userId: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${userId}`);
}
 

getCurrentUser(): Observable<User | null> {
  // Retourne l'utilisateur actuel, vérifie s'il est stocké
  return of(this.currentUser);
}

// Vérifiez si l'utilisateur est un administrateur
isAdmin(user: User | null): boolean {
  return user ? user.role === 'admin' : false;
}

// Vérifiez si l'utilisateur est un utilisateur normal
isUser(user: User | null): boolean {
  return user ? user.role === 'user' : false;
}

logout(): void {
  this.currentUser = null; // Réinitialise l'utilisateur courant
  localStorage.removeItem('currentUser'); // Supprime l'utilisateur du localStorage
}
resetPassword(username: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/reset-password`, { username });
}
}