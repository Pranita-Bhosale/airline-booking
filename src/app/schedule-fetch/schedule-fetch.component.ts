import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScheduleService } from '../schedule.service';
import { RouteService } from '../route.service';
import { Schedule } from '../model/Schedule';
import { empty } from 'rxjs';

@Component({
  selector: 'app-schedule-fetch',
  templateUrl: './schedule-fetch.component.html',
  styleUrls: ['./schedule-fetch.component.css']
})
export class ScheduleFetchComponent implements OnInit {
  scheduleform: FormGroup;
  errorMessage: string;
  successMessage: string;
  Cities: any[] = [];
  specificSchedule: any[] = [];



  constructor(private formbuilder: FormBuilder, private router: Router, private scheduleservice: ScheduleService, private routeService: RouteService) { }



  ngOnInit(): void {
    this.populatecities();
    this.scheduleform = this.formbuilder.group({
      source: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      date: ['', [Validators.required]],
    })
  }

  fetchSchedule() {
    let source = this.scheduleform.value.source;
    let destination = this.scheduleform.value.destination;
    let date = this.scheduleform.value.date;

    this.scheduleservice.fetchSchedule(source, destination, date).subscribe(
      (data: any) => {
        if (this.specificSchedule.length == 0) {
          this.specificSchedule = data;
          this.scheduleform.reset();
          this.successMessage = "No Flights found for this route";
        }
        if (this.specificSchedule.length != 0) {
          this.successMessage = "";
        }
      },
      (error: any) => {
        this.scheduleform.reset();
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

  updateSchedule(schedule: Schedule) {
    this.router.navigate(['/schedule/update-schedule'], { state: { data: schedule } });
  }

  deleteSchedule(s: Schedule) {
    this.scheduleservice.deleteSchedule(s.id).subscribe(
      (data: any) => {
        window.alert(data);
        let index = this.specificSchedule.indexOf(s);
        console.log(index);
        this.specificSchedule.splice(index, 1);
      },
      (error: any) => {
        this.errorMessage = error;
      }
    )
  }
}
