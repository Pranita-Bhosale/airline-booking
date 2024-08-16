import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteService } from '../route.service';
import { Route } from '../model/Route';

@Component({
  selector: 'app-update-route',
  templateUrl: './update-route.component.html',
  styleUrls: ['./update-route.component.css']
})
export class UpdateRouteComponent implements OnInit {
  updaterouteForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  temp: Route;
  Cities: any[] = [];
  constructor(private formBuilder: FormBuilder, private router: Router, private routeService: RouteService, private activatedRoute: ActivatedRoute) {
    this.temp = this.router.getCurrentNavigation().extras.state['data'];
    console.log(this.temp);
  }

  ngOnInit(): void {
    this.populatecities();
    this.updaterouteForm = this.formBuilder.group({
      source: [this.temp.source, [Validators.required]],
      destination: [this.temp.destination, [Validators.required]],
      distance: [this.temp.distance, [Validators.required, Validators.pattern("[0-9.]{3,5}")]]
    })
  }

  updateRoute() {
    this.temp.source = this.updaterouteForm.value.source;
    this.temp.destination = this.updaterouteForm.value.destination;
    this.temp.distance = this.updaterouteForm.value.distance;

    this.routeService.updateRoute(this.temp)
      .subscribe((data: any) => {
        this.updaterouteForm.reset();//
        this.successMessage = data;
      },

        (error: any) => {
          this.updaterouteForm.reset();//
          this.errorMessage = error;
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
