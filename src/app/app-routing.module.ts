import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { ApphomeComponent } from './apphome/apphome.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { RouteComponent } from './route/route.component';
import { BookingComponent } from './booking/booking.component';
import { PlaneComponent } from './plane/plane.component';
import { UpdateRouteComponent } from './update-route/update-route.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: "plane",
    component: PlaneComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "userhome",
    component: UserhomeComponent,
  },
  {
    path: "adminhome",
    component: AdminhomeComponent,
  },
  {
    path: "apphome",
    component: ApphomeComponent,
  },
  {
    path: "schedule",
    component: ScheduleComponent,
  },
  {
    path: "route",
    component: RouteComponent,
  },
  {
    path: "booking",
    component: BookingComponent,
  },
  {

    path: "update-route",
    component: UpdateRouteComponent,
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent, 
  },
  {
    path: "registration",
    component: RegistrationComponent,
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
