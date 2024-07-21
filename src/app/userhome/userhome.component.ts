import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

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

      case 'apphome':
        this.selectedTab = "apphome";
        this.router.navigate(['/apphome']);
        break;
      case 'booking':
        this.selectedTab = "booking";
        this.router.navigate(['/booking']);
        break;
      case 'login':
        this.selectedTab = "login";
        this.router.navigate(['/login']);
        break;
      case 'signup':
        this.selectedTab = "signup";
        this.router.navigate(['/signup']);
        break;
      default: this.router.navigate[''];
    }
  }
}
