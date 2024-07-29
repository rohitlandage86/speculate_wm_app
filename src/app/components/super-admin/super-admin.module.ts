import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { OrganizationComponent } from './organization/organization.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddUpdateOrganizationComponent } from './organization/add-update-organization/add-update-organization.component';
import { OrganizationUserComponent } from './organization-user/organization-user.component';
import { AddUpdateOrganizationUserComponent } from './organization-user/add-update-organization-user/add-update-organization-user.component';
import { SportsComponent } from './sports/sports.component';
import { AddUpdateSportsComponent } from './sports/add-update-sports/add-update-sports.component';
import { StatesComponent } from './states/states.component';
import { AddUpdateStateComponent } from './states/add-update-state/add-update-state.component';
import { EventComponent } from './betting-type/event/event.component';
import { MarketComponent } from './betting-type/market/market.component';
import { OutcomeComponent } from './betting-type/outcome/outcome.component';
import { PeriodComponent } from './betting-type/period/period.component';
import { AddUpdateEventComponent } from './betting-type/event/add-update-event/add-update-event.component';
import { AddUpdateMarketComponent } from './betting-type/market/add-update-market/add-update-market.component';
import { AddUpdateOutcomeComponent } from './betting-type/outcome/add-update-outcome/add-update-outcome.component';
import { AddUpdatePeriodComponent } from './betting-type/period/add-update-period/add-update-period.component';
import { ConfigurationComponent } from './settings/configuration/configuration.component';
import { AddUpdateConfigurationComponent } from './settings/configuration/add-update-configuration/add-update-configuration.component';


@NgModule({
  declarations: [
    SuperAdminDashboardComponent,
    OrganizationComponent,
    AddUpdateOrganizationComponent,
    OrganizationUserComponent,
    AddUpdateOrganizationUserComponent,
    SportsComponent,
    AddUpdateSportsComponent,
    StatesComponent,
    AddUpdateStateComponent,
    EventComponent,
    MarketComponent,
    OutcomeComponent,
    PeriodComponent,
    AddUpdateEventComponent,
    AddUpdateMarketComponent,
    AddUpdateOutcomeComponent,
    AddUpdatePeriodComponent,
    ConfigurationComponent,
    AddUpdateConfigurationComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SharedModule,
  ]
})
export class SuperAdminModule { }
