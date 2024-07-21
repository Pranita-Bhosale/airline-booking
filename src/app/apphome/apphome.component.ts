import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ScheduleService } from '../schedule.service';
import { BookingService } from '../booking.service';
import { Booking } from '../model/Booking';

@Component({
  selector: 'app-apphome',
  templateUrl: './apphome.component.html',
  styleUrls: ['./apphome.component.css']
})
export class ApphomeComponent implements OnInit {
  username: string;
  errorMessage: string;
  successMessage: string;
  apphomeForm: FormGroup;
  booking: Booking;
  public Schedule: any[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private scheduleservice: ScheduleService, private bookingService: BookingService) { }

  Cities: string[] = ["Pune", "Mumbai", "Sangali", "Solapur", "Satara", "Goa", "hyderabad", "Gudgaon"];

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.apphomeForm = this.formBuilder.group({
      source: '',
      destination: '',
      date: ''
    });

  }

  getSchedule() {

    if (this.apphomeForm.value.date == '') {
      this.errorMessage = "Please select valid date";
      return;
    }
    this.errorMessage = null;
    this.successMessage = '';

    this.scheduleservice.getSchedule(this.apphomeForm.value.source,
      this.apphomeForm.value.destination, this.apphomeForm.value.date).subscribe(
        (data: any) => {
          this.Schedule = data;
          if (this.Schedule.length == 0) {
            this.successMessage = "No Flights found for this route";
          }
        },
        (error: any) => {
          this.errorMessage = error;
        }
      )
  }
  getUserDetails() {
    this.router.navigate(['/userhome']);
  }
  book(schedule) {
    this.bookingService.bookPlane(new Booking(schedule.source, schedule.destination, schedule.arrivalDateTime, schedule.fare, localStorage.getItem("username"), schedule.planeId)).subscribe(
      (data: any) => {
        //this.booking = data;
        window.alert("Booking created :" + data);
        this.router.navigate(['/booking']);

      },
      (error: any) => {
        this.errorMessage = error;
      });
  }


}
