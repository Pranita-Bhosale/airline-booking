import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from '../route.service';
import { Route } from '../model/Route';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {


  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

  }
  navigateToChild(navigation) {

    switch (navigation) {

      case 'create-route':
        this.router.navigate(['/route/create-route']);
        break;
      case 'getall-route':
        this.router.navigate(['/route/getall-route']);
        break;
      default: this.router.navigate['/route'];
    }
  }
}
