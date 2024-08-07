import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPassword } from '../model/ForgotPassword';

import { UserService } from '../user.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
forgotPassword: FormGroup;
errorMessage:String;
successMessage:String;
constructor(private formBuilder: FormBuilder,private router:Router, private userService: UserService ) { }


  ngOnInit(): void {
    this.forgotPassword = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("[A-Za-z0-9.]{6,15}")]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
   
    }
  
submit(){
  let username=this.forgotPassword.value.username;
  let password=this.forgotPassword.value.password;
  let mobileNo=this.forgotPassword.value.mobileNo;
  this.userService.resetPassword(new ForgotPassword(username, password, mobileNo))
  .subscribe(
    (data) => {
      window.alert(data);
      this.forgotPassword.reset();
      this.router.navigate['/login'];
    },
    (error) => {
      this.forgotPassword.reset();
      this.errorMessage = error;
      this.router.navigate['/login'];
    }
  );

}

  onSubmit():void {
    if(this.forgotPassword.valid){
      console.log('forgot Password from submitted',this.forgotPassword.value);
    
    }
    }

}
