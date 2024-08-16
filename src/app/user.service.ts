import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable,  } from '@angular/core';
import { Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { Login } from './model/Login';
import { User } from './model/User';
import { ForgotPassword } from './model/ForgotPassword';

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
  resetPassword(forgotPassword: ForgotPassword):Observable<any> | any {
    return this.http.post(this.URL + "/passwordReset",forgotPassword,{ responseType:'text'}).pipe(
      catchError(this.handleError)
    );
  }
  
  addUserDetails(user: User): Observable<any> | any {
    return this.http.post(this.URL + "/users", user, { responseType: 'text' }).pipe(
      catchError(this.handleError));
  }

  getUserDetails(username: string): Observable<User> {
    return this.http.get<User>(this.URL + "/users?username=" + username).pipe(
      catchError(this.handleError));
  }
  getAllUserDetails(): Observable<User> {
    return this.http.get<User>(this.URL + "/all-users").pipe(
      catchError(this.handleError));
  }
  

  fetchUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.URL}/getUserByUsername?username=${username}`).pipe(
      catchError(this.handleError)
    );
  }
  changePassword(login: { username: string; password: string }): Observable<any> {
    return this.http.put(this.URL + "/passwordReset", login, { responseType: 'text' });
  }
  
  updateUserDetails(user: User): Observable<any> {
    return this.http.put(`${this.URL}/users`, user, { responseType: 'text' });
  }
  //to check user is exist or not in login table
  checkUserExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.URL}/check-user-exist`, { params: { username } });
  }
  
  addUserProfile(user: User): Observable<any> {
    return this.checkUserExists(user.username).pipe(
      switchMap((exists: boolean) => {
        if (exists) {
          return this.http.post(this.URL + "/users", user, { responseType: 'text' }).pipe(
            catchError(this.handleError)
          );
        } else {
          return of('User does not exist in login table');
        }
      }),
      catchError(this.handleError)
    );
  }
  
  private handleError(err: HttpErrorResponse) {
    console.log(err);
    let errorMessage = '';

    if (err.statusText === "Unknown Error") {
      console.log("Unknown Error: " + err.statusText);
      errorMessage = "Unable to connect to the server";
    } else if (err.status === 400) {
      errorMessage = err.error;
    } else if (err.status === 404) {
      errorMessage = "User not found";
    } else {
      errorMessage = "An unexpected error occurred";
    }
    return throwError(() => new Error(errorMessage));
  }
}
