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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserhomeComponent,
    AdminhomeComponent,
    ApphomeComponent,
    ScheduleComponent,
    RouteComponent,
    BookingComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService, ScheduleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
