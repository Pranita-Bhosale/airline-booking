import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteService } from '../route.service';
import { Route } from '../model/Route';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {
  routeForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  Route: any[] = [];

  Cities: string[] = ["Pune", "Mumbai", "Sangali", "Solapur", "Satara", "Goa", "hyderabad", "Gudgaon"];

  constructor(private formBuilder: FormBuilder, private router: Router, private routeService: RouteService) { }

  ngOnInit(): void {
    this.routeForm = this.formBuilder.group({
      id: ['', Validators.required],
      source: ['', Validators.required],
      destination: ['', Validators.required],
      distance: ''
    })
  }
  getallRoute() {
    this.routeService.getAllroute()
      .subscribe((data: any) => {
        this.Route = data
        if (this.Route.length == 0) {
          this.successMessage = "No routes available available add schedule";
        }
      },
        (error: any) => { this.errorMessage = error }
      )
  }

  addRoute() {
    let id = this.routeForm.value.id;
    let source = this.routeForm.value.source;
    let destination = this.routeForm.value.destination;
    let distance = this.routeForm.value.distance;


    this.routeService.addRoute(new Route(id, source, destination, distance))
      .subscribe((data: any) => {
        this.routeForm.reset();//
        this.successMessage = data;
      },
        (error: any) => {
          this.routeForm.reset();//
          this.errorMessage = error;
        }
      )
  }
}
