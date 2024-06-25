import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Login } from '../model/Login';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("[A-Za-z0-9.]{6,15}")]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]]
    })
  }


  signup() {
    let username = this.signupForm.value.username;
    this.userService.userSignup(new Login(username, this.signupForm.value.password))
      .subscribe(
        (data) => {

          window.alert("Signup success" + data);
        },
        (error) => {
          this.signupForm.reset();
          this.errorMessage = error;
          window.alert("user already exists please login" + error);
        }
      )
  }

}
