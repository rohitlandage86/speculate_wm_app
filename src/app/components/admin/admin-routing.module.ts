import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from 'src/app/shared/auth-guard.service';
import { OrganizationComponent } from './organization/organization.component';
import { UserOrganizationComponent } from './user-organization/user-organization.component';
import { SportsComponent } from './sports/sports.component';
import { StatesComponent } from './states/states.component';
import { AddUpdateStateComponent } from '../super-admin/states/add-update-state/add-update-state.component';
import { EditStatesComponent } from './states/edit-states/edit-states.component';
import { EditUserOrganizationComponent } from './user-organization/edit-user-organization/edit-user-organization.component';
import { GamblerUserComponent } from './gambler-user/gambler-user.component';

const routes: Routes = [
  { path: "", redirectTo: "admin", pathMatch: "full" },
  { path: "", 
    component: AdminDashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "admin-dashboard",
    component: AdminDashboardComponent,
    pathMatch: "full",
    outlet: "admin_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "organization",
    component: OrganizationComponent,
    pathMatch: "full",
    outlet: "admin_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "user-organization",
    component: UserOrganizationComponent,
    pathMatch: "full",
    outlet: "admin_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "edit-user-organization/:id",
    component: EditUserOrganizationComponent,
    pathMatch: "full",
    outlet: "admin_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "sports",
    component: SportsComponent,
    pathMatch: "full",
    outlet: "admin_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "states",
    component: StatesComponent,
    pathMatch: "full",
    outlet: "admin_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "edit-states/:id",
    component: EditStatesComponent,
    pathMatch: "full",
    outlet: "admin_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "gambler-user",
    component: GamblerUserComponent,
    pathMatch: "full",
    outlet: "admin_Menu",
    canActivate:[AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
