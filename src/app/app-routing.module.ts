import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { ApphomeComponent } from './apphome/apphome.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "userhome",
    component: UserhomeComponent,
  },
  {
    path: "adminhome",
    component: AdminhomeComponent,
  },
  {
    path: "apphome",
    component: ApphomeComponent,
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
