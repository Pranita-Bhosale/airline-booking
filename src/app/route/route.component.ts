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
  routeForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  Route: any[] = [];
  Cities: string[] = ["Select City", "Pune", "Mumbai", "Sangali", "Solapur", "Satara", "Goa", "hyderabad", "Gudgaon"];
  source: string = '';
  destination: string = '';
  distance: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private routeService: RouteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeForm = this.formBuilder.group({
      id: ['', Validators.required],
      source: ['', Validators.required],
      destination: ['', Validators.required],
      distance: ['', Validators.required, Validators.pattern("[0-9.]{3,5}")]
    })
  }

  getallRoute() {
    this.routeService.getAllroute()
      .subscribe((data: any) => {
        let id = data.id;
        localStorage.setItem("id", id);
        this.Route = data
        if (this.Route.length == 0) {
          this.successMessage = "No routes available available add schedule";
        }
      },
        (error: any) => { this.errorMessage = error }
      )
  }

  addRoute() {

    let source = this.routeForm.value.source;
    let destination = this.routeForm.value.destination;
    let distance = this.routeForm.value.distance;

    this.routeService.addRoute(new Route(source, destination, distance))
      .subscribe((data: any) => {
        this.routeForm.reset();
        this.successMessage = data;
      },
        (error: any) => {
          this.routeForm.reset();
          this.errorMessage = error;
        }
      )
  }

  goToUpdateRoute() {
    this.router.navigate((['update-route']));
  }



}
