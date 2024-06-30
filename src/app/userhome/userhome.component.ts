import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { user } from '../model/user';
import { last } from 'rxjs';

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

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
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
    this.errorMessage = undefined;
    let title = this.userhomeform.value.title;
    let firstname = this.userhomeform.value.firstname;
    let lastname = this.userhomeform.value.lastname;
    let email = this.userhomeform.value.email;
    let mobileNumber = this.userhomeform.value.mobileNumber;
    let gender = this.userhomeform.value.gender;
    let age = this.userhomeform.value.age;

    this.userService.addUserDetails(new user(title, firstname, lastname, email, mobileNumber, gender, age))
      .subscribe((data) => {
        this.userhomeform.reset();
        this.successMessage = data;
      },
        (error) => {
          this.userhomeform.reset();
          this.errorMessage = error;
        })


  }
  onSubmit() {
    console.log("first" + this.userhomeform.value.firstName);
    this.router.navigate(['/'])
  }

}
