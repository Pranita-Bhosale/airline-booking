import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScheduleService } from '../schedule.service';
import { Schedule } from '../model/Schedule';
import { RouteService } from '../route.service';

@Component({
  selector: 'app-schedule-create',
  templateUrl: './schedule-create.component.html',
  styleUrls: ['./schedule-create.component.css']
})
export class ScheduleCreateComponent implements OnInit {
  scheduleform: FormGroup;
  errorMessage: string;
  successMessage: string;
  Cities: any[] = [];
  mindate: string;
  constructor(private routeService: RouteService, private formbuilder: FormBuilder, private router: Router, private scheduleservice: ScheduleService) { }



  ngOnInit(): void {
    this.populatecities();
    this.setMinDate();
    this.scheduleform = this.formbuilder.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      d_date: ['', Validators.required],
      d_time: ['', Validators.required],
      a_date: ['', Validators.required],
      a_time: ['', Validators.required],
      planeId: ['', Validators.required]
    })
  }

  addSchedule() {
    let destination = this.scheduleform.value.destination;
    let departureDateTime = this.scheduleform.value.d_date + "T" + this.scheduleform.value.d_time + ":00.00000";
    let arrivalDateTime = this.scheduleform.value.a_date + "T" + this.scheduleform.value.a_time + ":00.00000";
    let planeId = this.scheduleform.value.planeId;
    let source = this.scheduleform.value.source;

    this.scheduleservice.addSchedule(new Schedule(source, destination, departureDateTime, arrivalDateTime, planeId
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

  populatecities() {
    this.routeService.getAllCities()
      .subscribe((data: any) => {
        this.Cities = data;
      },
        (error: any) => {
          this.errorMessage = error;
        }
      )
  }

  setMinDate() {
    let now = new Date();
    console.log(now);
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    this.mindate = now.getFullYear() + "-" + (month) + "-" + (day);//2024-07-21
  }

}
