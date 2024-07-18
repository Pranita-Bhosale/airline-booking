import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../model/User';


@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
 /* userhomeform: FormGroup;
  errorMessage: string;
  successMessage: string;
  ages: number[] = [];
  username: string;
  user: User = new User();
  profile: boolean;
  email: boolean;*/
  user: User[] = [];
  errorMessage: string | null = null;
  successMessage: string = '';
  username: string = '';
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    /*this.username = localStorage.getItem("username");
    this.userhomeform = this.formBuilder.group({
      title: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobilenumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      age: ['', [Validators.required]],
      gender: ['', Validators.required],
    });
    for (let i = 12; i <= 60; i++) {
      this.ages.push(i);
    }
    this.route.queryParams.subscribe(params => {
      this.profile = params['profile'];
      console.log(this.profile);
      this.getUserDetails();
  });
*/
  }
/*
  addUserDetails() {
    this.user.title = this.userhomeform.value.title;
    this.user.firstName = this.userhomeform.value.firstname;
    this.user.lastName = this.userhomeform.value.lastname;
    this.user.email = this.userhomeform.value.email;
    this.user.mobileNumber = this.userhomeform.value.mobilenumber;
    this.user.gender = this.userhomeform.value.gender;
    this.user.age = this.userhomeform.value.age;
    this.user.username = this.username;
    this.userService.addUserDetails(this.user)
      .subscribe(
        (data) => {
          this.successMessage = data;
        },
        (error) => {
          this.errorMessage = error;
        }
      )
  }

  getUserDetails(){
    this.userService.getUserDetails(this.username)
    .subscribe(
      (data) => {
        this.user = data;
        if(this.user.email==null)
          this.email=false;
        this.email=true;
      },
      (error) => {
        this.errorMessage = error;
      }
    )
  }

  onSubmit() {
    console.log("first" + this.userhomeform.value.firstName);
    this.router.navigate(['/'])
  }
*/
getUserBooking(){
  this.router.navigate(['/booking']);
}
  
appHome(){
 this.router.navigate(['/apphome'])
}

fetchUser() {
  this.errorMessage = null;
  this.successMessage = '';

  this.userService.fetchUserByUsername(this.username).subscribe(
    (data: User) => {
      this.user = [data];
      this.successMessage = 'User fetched successfully';
    },
    (error: any) => {
      this.errorMessage = error;
    }
  );
}

getAllUsers() {
  this.errorMessage = null;
  this.successMessage = '';

  this.userService.fetchAllUsers().subscribe(
    (data: User[]) => {
      this.user = data;

      if (this.user.length === 0) {
        this.successMessage = 'No User found';
      }
    },
    (error: any) => {
      this.errorMessage = error;
    }
  );
}

}
