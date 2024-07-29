import { AuthGuard } from './../../shared/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { LoginComponent } from '../auth/login/login.component';
// import { SignUpComponent } from '../auth/sign-up/sign-up.component';

const routes: Routes = [
  { path: "", redirectTo: "gambler", pathMatch: "full" },
  // {
  //   path: "login",
  //   // redirectTo: "",
  //   component: LoginComponent,
  //   pathMatch: "full",
  //   outlet: "sub_Menu",
  // }, 
  //   {
  //   path: "sign-up",
  //   component: SignUpComponent,
  //   pathMatch: "full",
  //   outlet: "sub_Menu",
  // },
  {
    path: "dashboard",
    component: DashboardComponent,
    pathMatch: "full",
    outlet: "sub_Menu",
    canActivate:[AuthGuard]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamblerRoutingModule { }
