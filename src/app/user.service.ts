import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,catchError, tap, throwError } from 'rxjs';
import { Login } from './model/Login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = "http://192.168.1.9:8080";

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

  handleError(err: HttpErrorResponse){
    let errorMessage = '';

    if (err.error instanceof Error) {
      console.log("Network Error: " + err.error.message);
      errorMessage = err.error.message;
    }

    else if (err.statusText == "Unknown Error") {
      console.log("Unknown Error: " + err.statusText);
      errorMessage = "Unable to connect to the server";
    }
    else {
      console.log("Backend Error: " + err.error);
      errorMessage = err.error;
    }
    return throwError(() => errorMessage);
  }
}
