import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { Schedule } from '../model/Schedule';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-schedule-getall',
  templateUrl: './schedule-getall.component.html',
  styleUrls: ['./schedule-getall.component.css']
})
export class ScheduleGetallComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  allSchedule: any[] = [];
  mindate: string;

  constructor(private scheduleservice: ScheduleService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.setMinDate();
    this.getAllSchedule();
  }

  getAllSchedule() {
    this.scheduleservice.getAllschedules()
      .subscribe((data: any) => {
        this.allSchedule = data;
        if (this.allSchedule.length == 0) {
          this.successMessage = "No Flights available, Create schedule";
        }

      },
        (error: any) => { this.errorMessage = error }
      )
  }

  setMinDate() {
    let now = new Date();
    console.log(now);
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    this.mindate = now.getFullYear() + "-" + (month) + "-" + (day);//2024-07-21
  }

  updateSchedule(schedule: Schedule) {
    this.router.navigate(['/schedule/update-schedule'], { state: { data: schedule } });
  }

  deleteSchedule(s: Schedule) {
    this.scheduleservice.deleteSchedule(s.id).subscribe(
      (data: any) => {
        window.alert(data);
        let index = this.allSchedule.indexOf(s);
        console.log(index);
        this.allSchedule.splice(index, 1);
      },
      (error: any) => {
        this.errorMessage = error;
      }
    )
  }

}
