import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from './model/Booking';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }
  getAllBookings(): Observable<Booking[]> | any {
    return this.http.get<Booking[]>(this.URL + "/getAllBookings").pipe(
      catchError(this.handleError)
    );
  }
  getUserBookings( username: string): Observable<Booking[]> | any {
    return this.http.get<Booking[]>(this.URL + "/getUserBookings?username="+username).pipe(
      catchError(this.handleError)
    );
  }
  bookPlane( booking: Booking): Observable<String[]> | any {
    return this.http.post(this.URL + "/booking", booking, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  cancelBooking( bid: string): Observable<String[]> | any {
    return this.http.delete(this.URL + "/booking?bid="+bid, { responseType: 'text' }).pipe(
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




