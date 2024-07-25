import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Schedule } from './model/Schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  URL = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  getSchedule(source: string, destination: string, date: string): Observable<Schedule[]> | any {
    let query = "source=" + source + "&destination=" + destination + "&departureDateTime=" + date ;
    return this.http.get<Schedule[]>(this.URL + "/getschedules?" + query).pipe(
      catchError(this.handleError)
    );
  }

  fetchSchedule(source: string, destination: string, date: string): Observable<Schedule[]> | any {
    let query = "source=" + source + "&destination=" + destination + "&departureDateTime=" + date;
    return this.http.get<Schedule[]>(this.URL + "/getschedules?" + query).pipe(
      catchError(this.handleError)
    );
  }

  getAllschedules(): (Observable<Schedule[]> | any) {
    return this.http.get<Schedule[]>(this.URL + "/getall-schedules").pipe(
      catchError(this.handleError)
    );
  }
                     

  addSchedule(schedule: Schedule): (Observable<any> | any) {
    return this.http.post(this.URL + "/add-schedule", schedule, { responseType: 'text' }).pipe(
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