import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteService } from '../route.service';
import { Route } from '../model/Route';

@Component({
  selector: 'app-route-getall',
  templateUrl: './route-getall.component.html',
  styleUrls: ['./route-getall.component.css']
})
export class RouteGetallComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  Route: any[] = [];

  constructor(private router: Router, private routeService: RouteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getallRoute();
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

  updateRoute(route: Route) {
    this.router.navigate(['/route/update-route'], { state: { data: route } });
  }

  deleteRoute(route: Route) {
    this.routeService.deleteRoute(route.id).subscribe(
      (data: any) => {
        window.alert(data);
        let index = this.Route.indexOf(route);
        console.log(index);
        this.Route.splice(index, 1);

      },
      (error: any) => {
        this.errorMessage = error;
      }
    )
  }
}

