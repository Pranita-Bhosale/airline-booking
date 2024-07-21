import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  username: string;
  role: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.role = localStorage.getItem("role");
  }
}
