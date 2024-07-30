import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  profileExists: boolean = false;
  isEditMode: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem("username") || '';
    this.initProfileForm();
    this.getUserDetails();
  }

  initProfileForm() {
    this.userhomeform = this.formBuilder.group({
      title: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      age: ['', [Validators.required]],
      gender: ['', Validators.required]
    });
    for (let i = 12; i <= 60; i++) {
      this.ages.push(i);
    }
  }

  addUserDetails() {
    this.user = this.userhomeform.value;
    this.user.username = this.username;
    this.userService.addUserProfile(this.user).subscribe(
      (data) => {
        this.successMessage = 'User saved successfully';
        this.errorMessage = '';
        this.getUserDetails();
      },
      (error) => {
        this.errorMessage = error;
        this.successMessage = '';
      }
    );
  }

  updateUserDetails() {
    this.user = this.userhomeform.value;
    this.user.username = this.username;
    this.userService.updateUserDetails(this.user).subscribe(
      (data) => {
        this.successMessage = 'User updated successfully';
        this.errorMessage = '';
        this.isEditMode = false;
        this.getUserDetails();
      },
      (error) => {
        this.errorMessage = error;
        this.successMessage = '';
      }
    );
  }

  getUserDetails() {
    this.userService.fetchUserByUsername(this.username).subscribe(
      (data) => {
        if (data) {
          this.user = data;
          this.profileExists = true;
          this.userhomeform.patchValue(this.user);
        } else {
          this.profileExists = false;
        }
      },
      (error) => {
        this.errorMessage = '';
      }
    );
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.userhomeform.patchValue(this.user); // Revert changes if edit mode is canceled
    }
  }
}
