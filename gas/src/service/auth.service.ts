import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.exemplo.com/auth/login'; // URL da API

  constructor(private http: HttpClient) {}

  login(credentials: LoginModel): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }
}
