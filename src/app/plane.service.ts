import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Plane} from './model/Plane';
@Injectable({
  providedIn: 'root'
})
export class PlaneService {
 
  URL = "http://localhost:8080";
  constructor(private http:HttpClient) { }

  addPlane(plane: Plane): (Observable<any> | any) {
    return this.http.post(this.URL + "/plane-info", plane, { responseType: 'text' }).pipe(
      catchError(this.handleError))
  }

  getAllplane(): (Observable<any> | any) {
    return this.http.get(this.URL + "/getall-plane").pipe(
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




