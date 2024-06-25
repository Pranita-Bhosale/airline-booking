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
  userId: string;
  role: string;
  username: string;


  constructor(private router: Router, private _userService: UserService) { }

  async ngOnInit() {
    // this.userId = "ajay";
  }

  defaultHome() {
    if (this.userId) {
      if (this.role == 'admin') {
        this.router.navigate(['/adminhome']);
      } else {
        this.router.navigate(['/userhome']);
      }
    }
    this.router.navigate(['/']);
  }
}
