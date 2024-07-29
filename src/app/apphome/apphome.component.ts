import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScheduleService } from '../schedule.service';
import { BookingService } from '../booking.service';
import { Booking } from '../model/Booking';
import { min } from 'rxjs';

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
  mindate: string;
  public Schedule: any[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private scheduleservice: ScheduleService, private bookingService: BookingService) { }

  Cities: string[] = ["Select City", "Pune", "Mumbai", "Sangali", "Solapur", "Satara", "Goa", "hyderabad", "Gudgaon"];

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.setMinDate();
    this.apphomeForm = this.formBuilder.group({
      source: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      date: ['', [Validators.required]]
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

  setMinDate() {
    let now = new Date();
    console.log(now);
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    this.mindate = now.getFullYear() + "-" + (month) + "-" + (day);//2024-07-21
  }


}
