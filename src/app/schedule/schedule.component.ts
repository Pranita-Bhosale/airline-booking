import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ScheduleService } from '../schedule.service';
import { Schedule } from '../model/Schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {
  scheduleform: FormGroup;
  errorMessage: string;
  successMessage: string;
  allSchedule: any[] = [];
  specificSchedule: any[] = [];


  constructor(private formbuilder: FormBuilder, private router: Router, private scheduleservice: ScheduleService) { }

  Cities: string[] = ["Pune", "Mumbai", "Sangali", "Solapur", "Satara", "Goa", "hyderabad", "Gudgaon"];

  ngOnInit(): void {
    this.scheduleform = this.formbuilder.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      d_date: ['', Validators.required],
      d_time: ['', Validators.required],
      a_date: ['', Validators.required],
      a_time: ['', Validators.required],
      fare: ['', Validators.required],
      date: ['', Validators.required],
      planeId: '',
      id: ''
    })
  }

  getAllSchedule() {
    this.scheduleservice.getAllschedules()
      .subscribe((data: any) => {
        this.allSchedule = data
        if (this.allSchedule.length == 0) {
          this.successMessage = "No Flights available add schedule";
        }

      },
        (error: any) => { this.errorMessage = error }
      )
  }

  addSchedule() {
    let destination = this.scheduleform.value.destination;
    let departureDateTime = this.scheduleform.value.d_date + "T" + this.scheduleform.value.d_time + ":00.00000";
    let arrivalDateTime = this.scheduleform.value.a_date + "T" + this.scheduleform.value.a_time + ":00.00000";
    let fare = this.scheduleform.value.fare;
    let planeId = this.scheduleform.value.planeId;
    let source = this.scheduleform.value.source;

    this.scheduleservice.addSchedule(new Schedule(source, destination, departureDateTime, arrivalDateTime, fare, planeId
    ))
      .subscribe((data: any) => {
        this.scheduleform.reset();//
        this.successMessage = data;
      },
        (error: any) => {
          this.scheduleform.reset();//
          this.errorMessage = error;
        }
      )
  }

  fetchSchedule() {
    let source = this.scheduleform.value.source;
    let destination = this.scheduleform.value.destination;
    let departureDateTime = this.scheduleform.value.date;

    this.scheduleservice.fetchSchedule(source, destination, departureDateTime).subscribe(
      (data: any) => {
        this.specificSchedule = data;
        if (this.specificSchedule.length == 0) {
          this.successMessage = "No Flights found for this route";
        }
      },
      (error: any) => {
        this.errorMessage = error;
      }
    )
  }

}
