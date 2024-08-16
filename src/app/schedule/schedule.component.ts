import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleService } from '../schedule.service';


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


  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  navigateToChild(navigation) {

    switch (navigation) {

      case 'create-schedule':
        this.router.navigate(['/schedule/create-schedule']);
        break;
      case 'getall-schedule':
        this.router.navigate(['/schedule/getall-schedule']);
        break;
      case 'fetch-schedule':
        this.router.navigate(['/schedule/fetch-schedule']);
        break;
      default: this.router.navigate['/schedule'];
    }
  }

}
