import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  title = 'Indigo Airline-booking';
  username: string;
  role: string;
  constructor(private router: Router, private _userService: UserService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.role = localStorage.getItem("role");
  }

  logout() {
    this.username = null;
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    console.log("removed user from storage");
    this.router.navigate(['']);
  }
  navigatesignup() {
    this.router.navigate(['signup'])
  }
  navigatelogin() {
    this.router.navigate(['login'])
  }
  userProfile() {
    this.router.navigate(['userhome'], { queryParams: { profile: true } })
  }
}
