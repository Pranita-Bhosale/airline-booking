import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {



  constructor(private router: Router, ) { }

  ngOnInit(): void {
  }

  bookings(){
    this.router.navigate(['/booking']);
  }
  planes(){
    this.router.navigate(['/plane']);
  }
  routes(){
    this.router.navigate(['/route']);
  }
  schedules(){
    this.router.navigate(['/schedule']);
  }
  users(){
    this.router.navigate(['/userhome']);
  }
}
