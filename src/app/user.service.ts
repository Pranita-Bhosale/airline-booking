import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Login } from './model/Login';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = "http://localhost:8080";

  userName: string = '';
  constructor(private http: HttpClient) { }

  userLogin(user: Login): Observable<Login> | any {

    return this.http.post(this.URL + "/login", user).pipe(
      catchError(this.handleError)
    );
  }

  userSignup(user: Login): Observable<any> | any {
    return this.http.post(this.URL + "/signup", user, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  addUserDetails(user: User): Observable<any> | any {
    return this.http.post(this.URL + "/users", user, { responseType: 'text' }).pipe(
      catchError(this.handleError));
  }
  
  getUserDetails(username: string): Observable<User>{
    return this.http.get<User>(this.URL + "/users?username="+username).pipe(
      catchError(this.handleError));
  }
  getAllUserDetails(): Observable<User>{
    return this.http.get<User>(this.URL + "/all-users").pipe(
      catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    console.log(err);
    let errorMessage = '';

    if (err.statusText == "Unknown Error") {
      console.log("Unknown Error: " + err.statusText);
      errorMessage = "Unable to connect to the server";
    }
    else if (err.status == 400) {
      errorMessage = err.error;
    }

    return throwError(() => errorMessage);
  }
}
