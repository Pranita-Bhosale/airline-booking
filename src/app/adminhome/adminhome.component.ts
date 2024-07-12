import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../model/User';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})


export class AdminhomeComponent implements OnInit {
  public users: any[];
  errorMessage: string;
  isOn: boolean; 
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.isOn=true;
  }

  bookings(){
    this.isOn=false;
    this.router.navigate(['/booking']);
  }
  planes(){
    this.isOn=false;
    this.router.navigate(['/plane']);
  }
  routes(){
    this.isOn=false;
    this.router.navigate(['/route']);
  }
  schedules(){
    this.isOn=false;
    this.router.navigate(['/schedule']);
  }
  getUsers(){
    this.isOn=false;
    this.userService.getAllUserDetails().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    )
  }
}
