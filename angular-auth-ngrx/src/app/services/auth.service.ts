import { Injectable, } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private Base_Url = 'http://localhost:1337';
  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.Base_Url}/login`;
    return this.http.post<User>(url, { email, password });
  }

  signUp(email: string, password: String): Observable<any> {
    const url = `${this.Base_Url}/register`;
    return this.http.post<User>(url, { email, password });
  }

  getStatus(): Observable<User> {
    const url = `${this.Base_Url}/status`;
    return this.http.get<User>(url);
  }
}
