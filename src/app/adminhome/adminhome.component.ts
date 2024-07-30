import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {
  username: string;
  role: string;
  selectedTab: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.role = localStorage.getItem("role");
  }

  navigateToChild(navigation) {

    switch (navigation) {

      case 'plane':
        this.selectedTab = "plane";
        this.router.navigate(['/plane']);
        break;
      case 'booking':
        this.selectedTab = "booking";
        this.router.navigate(['/booking']);
        break;
      case 'route':
        this.selectedTab = "route";
        this.router.navigate(['/route']);
        break;
      case 'schedule':
        this.selectedTab = "schedule";
        this.router.navigate(['/schedule']);
        break;
        
      default: this.router.navigate[''];
    }
  }
}
