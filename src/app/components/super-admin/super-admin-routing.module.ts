import { AddUpdateEventComponent } from './betting-type/event/add-update-event/add-update-event.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { AuthGuard } from 'src/app/shared/auth-guard.service';
import { OrganizationComponent } from './organization/organization.component';
import { AddUpdateOrganizationComponent } from './organization/add-update-organization/add-update-organization.component';
import { OrganizationUserComponent } from './organization-user/organization-user.component';
import { AddUpdateOrganizationUserComponent } from './organization-user/add-update-organization-user/add-update-organization-user.component';
import { SportsComponent } from './sports/sports.component';
import { AddUpdateSportsComponent } from './sports/add-update-sports/add-update-sports.component';
import { StatesComponent } from './states/states.component';
import { AddUpdateStateComponent } from './states/add-update-state/add-update-state.component';
import { EventComponent } from './betting-type/event/event.component';
import { MarketComponent } from './betting-type/market/market.component';
import { AddUpdateMarketComponent } from './betting-type/market/add-update-market/add-update-market.component';
import { OutcomeComponent } from './betting-type/outcome/outcome.component';
import { AddUpdateOutcomeComponent } from './betting-type/outcome/add-update-outcome/add-update-outcome.component';
import { PeriodComponent } from './betting-type/period/period.component';
import { AddUpdatePeriodComponent } from './betting-type/period/add-update-period/add-update-period.component';
import { ConfigurationComponent } from './settings/configuration/configuration.component';
import { AddUpdateConfigurationComponent } from './settings/configuration/add-update-configuration/add-update-configuration.component';

const routes: Routes = [
  { path: "", redirectTo: "super-admin", pathMatch: "full" },
  { path: "", 
    component: SuperAdminDashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "super-admin",
    component: SuperAdminDashboardComponent,
    pathMatch: "full",
    outlet: "super_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "organization",
    component: OrganizationComponent,
    pathMatch: "full",
    outlet: "super_Menu",
    canActivate:[AuthGuard]
  },
  { path: 'add-organization',
    component: AddUpdateOrganizationComponent,
    outlet: "super_Menu",
    canActivate:[AuthGuard]
  
   },
   {
     path: "edit-organization/:id",  
     component: AddUpdateOrganizationComponent,
     pathMatch: "full",
     outlet: "super_Menu",
     canActivate:[AuthGuard]
   },
   {
    path: "organization-user",
    component: OrganizationUserComponent,
    pathMatch: "full",
    outlet: "super_Menu",
    canActivate:[AuthGuard]
  },
  { path: 'add-organization-user',
    component: AddUpdateOrganizationUserComponent,
    outlet: "super_Menu",
    canActivate:[AuthGuard]
  
   },
   {
     path: "edit-organization-user/:id",  
     component: AddUpdateOrganizationUserComponent,
     pathMatch: "full",
     outlet: "super_Menu",
     canActivate:[AuthGuard]
   },
   {
    path: "sports",
    component: SportsComponent,
    pathMatch: "full",
    outlet: "super_Menu",
    canActivate:[AuthGuard]
  },
  { path: 'add-sports',
    component: AddUpdateSportsComponent,
    outlet: "super_Menu",
    canActivate:[AuthGuard]
  
   },
   {
     path: "edit-sports/:id",  
     component: AddUpdateSportsComponent,
     pathMatch: "full",
     outlet: "super_Menu",
     canActivate:[AuthGuard]
   },
   {
    path: "states",
    component: StatesComponent,
    pathMatch: "full",
    outlet: "super_Menu",
    canActivate:[AuthGuard]
  },
  { path: 'add-states',
    component: AddUpdateStateComponent,
    outlet: "super_Menu",
    canActivate:[AuthGuard]

   },
   {
     path: "edit-states/:id",
     component: AddUpdateStateComponent,
     pathMatch: "full",
     outlet: "super_Menu",
     canActivate:[AuthGuard]
   },
   {
    path: "event",
    component: EventComponent,
    pathMatch: "full",
    outlet: "super_Menu",
    canActivate:[AuthGuard]
  },
  { path: 'add-event',
    component:AddUpdateEventComponent,
    outlet: "super_Menu",
    canActivate:[AuthGuard]

   },
   {
     path: "edit-event/:id",
     component: AddUpdateEventComponent,
     pathMatch: "full",
     outlet: "super_Menu",
     canActivate:[AuthGuard]
   },
   {
    path: "event",
    component: EventComponent,
    pathMatch: "full",
    outlet: "super_Menu",
    canActivate:[AuthGuard]
  },
  { path: 'add-event',
    component:AddUpdateEventComponent,
    outlet: "super_Menu",
    canActivate:[AuthGuard]

   },
   {
     path: "edit-event/:id",
     component: AddUpdateEventComponent,
     pathMatch: "full",
     outlet: "super_Menu",
     canActivate:[AuthGuard]
   },
   {
    path: "market",
    component: MarketComponent,
    pathMatch: "full",
    outlet: "super_Menu",
    canActivate:[AuthGuard]
  },
  { path: 'add-market',
    component: AddUpdateMarketComponent,
    outlet: "super_Menu",
    canActivate:[AuthGuard]

   },
   {
     path: "edit-market/:id",
     component: AddUpdateMarketComponent,
     pathMatch: "full",
     outlet: "super_Menu",
     canActivate:[AuthGuard]
   },
   {
    path: "outcome",
    component: OutcomeComponent,
    pathMatch: "full",
    outlet: "super_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: 'add-outcome',
    component: AddUpdateOutcomeComponent,
    outlet: "super_Menu",
    canActivate:[AuthGuard]

   },
   {
     path: "edit-outcome/:id",
     component: AddUpdateOutcomeComponent,
     pathMatch: "full",
     outlet: "super_Menu",
     canActivate:[AuthGuard]
   },
   {
    path: "period",
    component: PeriodComponent,
    pathMatch: "full",
    outlet: "super_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: 'add-period',
    component: AddUpdatePeriodComponent,
    outlet: "super_Menu",
    canActivate:[AuthGuard]

   },
   {
     path: "edit-period/:id",
     component: AddUpdatePeriodComponent,
     pathMatch: "full",
     outlet: "super_Menu",
     canActivate:[AuthGuard]
   },
   {
    path: "configuration",
    component: ConfigurationComponent,
    pathMatch: "full",
    outlet: "super_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: 'add-configuration',
    component: AddUpdateConfigurationComponent,
    outlet: "super_Menu",
    canActivate:[AuthGuard]

   },
   {
     path: "edit-configuration/:id",
     component: AddUpdateConfigurationComponent,
     pathMatch: "full",
     outlet: "super_Menu",
     canActivate:[AuthGuard]
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
