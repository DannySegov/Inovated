import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseAdd } from '../shared/interfaces/clients';
import { environment } from 'src/environments/environment';
import { DataUser, UserResponse } from '../shared/interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);

  private readonly baseUrl: string = environment.baseUrl;
  private readonly headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  private usersSource = new BehaviorSubject<any>([]); 
  public users$ = this.usersSource.asObservable();

  private userSource = new BehaviorSubject<any>(null);
  currentUser = this.userSource.asObservable();

  private userIDSource = new BehaviorSubject<number | null>(null);
  currentUserID = this.userIDSource.asObservable();

  constructor() { }

  // Obtener Usuarios
  getUsers(elementos: number, pagina: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/usuarios?elementos=${elementos}&pagina=${pagina}`, { headers: this.headers });
  }

  // Crear Usuario
  addUsers(dataUser: DataUser): Observable<ResponseAdd> {
    return this.http.post<ResponseAdd>(`${this.baseUrl}/usuarios`, dataUser, { headers: this.headers });
  }

  // Obtener Usuario por ID
  getUserById(usuarioID: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/usuarios/info/${usuarioID}`, { headers: this.headers });
  }

  // Actualizar Usuario
  updateUser(usuarioID: number, dataUser: DataUser): Observable<ResponseAdd> {
    return this.http.put<ResponseAdd>(`${this.baseUrl}/usuarios/actualizar/${usuarioID}`, dataUser, { headers: this.headers });
  }

  //Eliminar Usuario
  deleteUser(usuarioID: number): Observable<ResponseAdd> {
    return this.http.delete<ResponseAdd>(`${this.baseUrl}/usuarios/eliminar/${usuarioID}`, { headers: this.headers });
  }

    // Método para actualizar la lista de usuarios
    updateUsersList() {
      this.getUsers(10, 1).subscribe(response => {
        this.usersSource.next(response.datos); // Actualizar la lista de usuarios
        console.log('Usuarios:', response.datos);
      });
    }

    // Método para obtener el token de acceso
    get accessToken(): string | null {
      return localStorage.getItem('access');
    }

    changeUser(user: any) {
      this.userSource.next(user);
    }

    changeUserID(id: number) {
      this.userIDSource.next(id);
    }
}
