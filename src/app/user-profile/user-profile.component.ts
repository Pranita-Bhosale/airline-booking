import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userhomeform: FormGroup;
  errorMessage: string;
  successMessage: string;
  ages: number[] = [];
  username: string;
  user: User = new User();
  profile: boolean;
  email: boolean;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }


  ngOnInit(): void {
  }

  initProfileForm() {
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
  }

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

  getUserDetails() {
    this.userService.getUserDetails(this.username)
      .subscribe(
        (data) => {
          this.user = data;
          if (this.user.email == null)
            this.email = false;
          this.email = true;
        },
        (error) => {
          this.errorMessage = error;
        }
      )
  }
}
