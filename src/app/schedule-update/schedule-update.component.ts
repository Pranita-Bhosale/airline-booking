import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteService } from '../route.service';
import { ScheduleService } from '../schedule.service';
import { Schedule } from '../model/Schedule';

@Component({
  selector: 'app-schedule-update',
  templateUrl: './schedule-update.component.html',
  styleUrls: ['./schedule-update.component.css']
})
export class ScheduleUpdateComponent implements OnInit {
  updateScheduleform: FormGroup;
  errorMessage: string;
  successMessage: string;
  Cities: any[] = [];
  mindate: string;
  temp: Schedule;
  constructor(private routeService: RouteService, private formbuilder: FormBuilder, private router: Router, private scheduleservice: ScheduleService) {
    this.temp = this.router.getCurrentNavigation().extras.state['data'];
  }

  ngOnInit(): void {
    this.setMinDate();
    this.populatecities();
    this.updateScheduleform = this.formbuilder.group({
      source: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      d_date: ['', [Validators.required]],
      d_time: ['', [Validators.required]],
      a_date: ['', [Validators.required]],
      a_time: ['', [Validators.required]],
      planeId: ['', [Validators.required]]
    })
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

  updateSchdeule() {
    this.temp.source = this.updateScheduleform.value.source;
    this.temp.destination = this.updateScheduleform.value.destination;
    this.temp.departureDateTime = this.updateScheduleform.value.d_date + "T" + this.updateScheduleform.value.d_time + ":00.00000";
    this.temp.arrivalDateTime = this.updateScheduleform.value.a_date + "T" + this.updateScheduleform.value.a_time + ":00.00000";
    this.temp.planeId = this.updateScheduleform.value.planeId;

    this.scheduleservice.updateSchedule(this.temp)
      .subscribe((data: any) => {
        this.updateScheduleform.reset();//
        this.successMessage = data;
      },

        (error: any) => {
          this.updateScheduleform.reset();//
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
