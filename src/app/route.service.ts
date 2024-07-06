import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Route } from './model/Route';


@Injectable({
  providedIn: 'root'
})
export class RouteService {
  URL = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  getAllroute(): (Observable<Route[]> | any) {
    return this.http.get<Route[]>(this.URL + "/get-allroute").pipe(
      catchError(this.handleError)
    );
  }

  addRoute(route: Route): (Observable<any> | any) {
    return this.http.post(this.URL + "/add-route", route, { responseType: 'text' }).pipe(
      catchError(this.handleError))
  }



  handleError(err: HttpErrorResponse) {
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
