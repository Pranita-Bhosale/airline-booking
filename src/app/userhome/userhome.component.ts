import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  userhomeform: FormGroup;
  errorMessage: string;
  successMessage: string;
  ages: number[] = [];
  username: string;
  user: User = new User();

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.userhomeform = this.formBuilder.group({
      title: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
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
    this.user.mobileNumber = this.userhomeform.value.mobileNumber;
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
    this.userhomeform.reset();
  }

  onSubmit() {
    console.log("first" + this.userhomeform.value.firstName);
    this.router.navigate(['/'])
  }
}
