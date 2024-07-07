import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from '../booking.service';
import { Schedule } from '../model/Schedule';
import { Booking } from '../model/Booking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
errorMessage:string;
successMessage:string;
bookingForm:FormGroup;
username: string;
@Input() schedule: Schedule;
public booking: Booking [] = [];

  constructor(private formBuilder: FormBuilder, private router:Router,private bookingService:BookingService){ }
  
  ngOnInit(): void {

    if(localStorage.getItem("role")=='admin')
      this.getallBooking();
    else
      this.getUserBooking()

}
getUserBooking(){ //for user
    this.bookingService.getUserBookings(localStorage.getItem("username")).subscribe(
      (data: any) => {
        this.booking = data;
      },
      (error: any) =>{
       this.errorMessage= error;
      }
    )
  }
  getallBooking(){  //for admin
    this.bookingService.getAllBookings().subscribe(
      (data: any) => {
        this.booking = data;
      },
      (error: any) =>{
       this.errorMessage= error;
      }
    )
  }

  cancelBooking(b: Booking){
    this.bookingService.cancelBooking(b.id).subscribe(
      (data: any) => {
        window.alert(data);
        let index = this.booking.indexOf(b);
        this.booking.splice(index, 1);
      },
      (error: any) =>{
       this.errorMessage= error;
      }
    )
  }
}


