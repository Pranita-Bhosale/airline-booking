import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'airline-booking';
  username: string;
  role: string;


  constructor(private router: Router, private _userService: UserService) { }

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.role = localStorage.getItem("role");
    console.log(this.username);
    console.log(this.role);
  }

  ngOnChange() {
    this.username = localStorage.getItem("username");
    this.role = localStorage.getItem("role");
    console.log(this.username);
    console.log(this.role);
  }
  logout() {
    this.username = null;
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    console.log("removed user from storage");
    this.router.navigate(['login']);
  }
  navigatesignup() {
    this.router.navigate(['signup'])
  }
  navigatelogin() {
    this.router.navigate(['login'])
  }
}
