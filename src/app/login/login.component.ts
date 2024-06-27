import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Login } from '../model/Login';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;
  //@Input() username: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("[A-Za-z0-9.]{6,15}")]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]]
    });

    let username = localStorage.getItem("username");
    let role = localStorage.getItem("role");
    if (username != undefined && role != undefined) {
      if (role == 'admin')
        this.router.navigate(['adminhome']);
      else if (role == 'user')
        this.router.navigate(['userhome']);
    }

  }

  login() {
    let username = this.loginForm.value.username;
    this.userService.userLogin(new Login(username, this.loginForm.value.password))
      .subscribe(
        (data) => {
          localStorage.setItem("username", username);
          if (data.isAdmin === "Y") {
            localStorage.setItem("role", "admin");
            this.router.navigate(['adminhome']);
          } else {
            localStorage.setItem("role", "user");
            this.router.navigate(['userhome']);
          }
        },
        (error) => {
          this.loginForm.reset();
          this.errorMessage = error;
        }
      )
  }
}
