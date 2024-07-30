import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  login = { username: '', password: '', confirmPassword: '' };
  message: string | undefined;
  isSuccess: boolean = false;
  passwordMismatch: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.login.username = localStorage.getItem("username") || '';
  }

  onSubmit() {
    if (this.login.password !== this.login.confirmPassword) {
      this.passwordMismatch = true;
      this.message = 'Passwords do not match.';
      this.isSuccess = false;
      return;
    } else {
      this.passwordMismatch = false;
    }

    this.userService.changePassword(this.login).subscribe(
      response => {
        this.message = 'Password Changed Successfully';
        this.isSuccess = true;
      },
      error => {
        this.message = error.error;
        this.isSuccess = false;
      }
    );
  }
}
