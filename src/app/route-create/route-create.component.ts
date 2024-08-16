import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '../model/Route';
import { RouteService } from '../route.service';

@Component({
  selector: 'app-route-create',
  templateUrl: './route-create.component.html',
  styleUrls: ['./route-create.component.css']
})
export class RouteCreateComponent implements OnInit {
  routeForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  Route: any[] = [];
  Cities: any[] = [];
  source: string = '';
  destination: string = '';
  distance: string = '';
  isError: boolean;
  constructor(private formBuilder: FormBuilder, private router: Router, private routeService: RouteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.populatecities();
    this.routeForm = this.formBuilder.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      distance: ['', [Validators.required, Validators.pattern("[0-9.]{3,5}")]]
    })
  }
  addRoute() {

    let source = this.routeForm.value.source;
    let destination = this.routeForm.value.destination;
    let distance = this.routeForm.value.distance;

    this.routeService.addRoute(new Route(source, destination, distance))
      .subscribe((data: any) => {
        this.routeForm.reset();
        this.successMessage = data;
        this.isError = false;
      },
        (error: any) => {
          this.routeForm.reset();
          this.errorMessage = error;
          this.isError = true;
        }
      )
  }

  populatecities() {
    this.routeService.getAllCities()
      .subscribe((data: any) => {
        this.Cities = data;
      },
        (error: any) => {
          this.errorMessage = error;
        }
      )
  }

}
