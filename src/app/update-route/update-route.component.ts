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
  Route: any[] = [];
  Cities: string[] = ["Select City", "Pune", "Mumbai", "Sangali", "Solapur", "Satara", "Goa", "hyderabad", "Gudgaon"];
  id: string;


  constructor(private formBuilder: FormBuilder, private router: Router, private routeService: RouteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("id");
    this.updaterouteForm = this.formBuilder.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      distance: ['', Validators.required, Validators.pattern("[0-9.]{3,5}")]
    })
  }

  updateRoute() {
    let source = this.updaterouteForm.value.source;
    let destination = this.updaterouteForm.value.destination;
    let distance = this.updaterouteForm.value.distance;

    this.routeService.updateRoute(new Route(source, destination, distance))
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


}
