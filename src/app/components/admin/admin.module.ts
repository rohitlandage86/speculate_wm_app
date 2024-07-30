import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganizationComponent } from './organization/organization.component';
import { UserOrganizationComponent } from './user-organization/user-organization.component';
import { StatesComponent } from './states/states.component';
import { SportsComponent } from './sports/sports.component';
import { EditStatesComponent } from './states/edit-states/edit-states.component';
import { EditUserOrganizationComponent } from './user-organization/edit-user-organization/edit-user-organization.component';
import { GamblerUserComponent } from './gambler-user/gambler-user.component';
import { ViewGamblerUserComponent } from './gambler-user/view-gambler-user/view-gambler-user.component';
import { ViewOrganizationComponent } from './organization/view-organization/view-organization.component';
import { ViewSportsComponent } from './sports/view-sports/view-sports.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    OrganizationComponent,
    UserOrganizationComponent,
    StatesComponent,
    SportsComponent,
    EditStatesComponent,
    EditUserOrganizationComponent,
    GamblerUserComponent,
    ViewGamblerUserComponent,
    ViewOrganizationComponent,
    ViewSportsComponent,
  
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
