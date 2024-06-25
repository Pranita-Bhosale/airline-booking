import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './model/Login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = "http://localhost:8080";

  userName: string = '';
  constructor(private http: HttpClient) { }

  userLogin(user: Login): Observable<Login> | any {

    return this.http.post(this.URL + "/login", user);
  }

  userSignup(user: Login): Observable<any> | any {
    return this.http.post(this.URL + "/signup", user, { responseType: 'text' });
  }
}
