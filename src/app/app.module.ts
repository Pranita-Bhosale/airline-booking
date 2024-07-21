import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { SignupComponent } from './signup/signup.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { ApphomeComponent } from './apphome/apphome.component';
import { ScheduleService } from './schedule.service';
import { ScheduleComponent } from './schedule/schedule.component';
import { RouteComponent } from './route/route.component';
import { BookingComponent } from './booking/booking.component';
import { UpdateRouteComponent } from './update-route/update-route.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { PlaneComponent } from './plane/plane.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserhomeComponent,
    AdminhomeComponent,
    PlaneComponent,
    ApphomeComponent,
    ScheduleComponent,
    RouteComponent,
    BookingComponent,
    UpdateRouteComponent,
    RegistrationComponent,
    AppHeaderComponent,
    AppFooterComponent,
    UserProfileComponent, 
    ForgotPasswordComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService, ScheduleService],
  bootstrap: [AppHeaderComponent, AppComponent, AppFooterComponent]
})
export class AppModule { }
