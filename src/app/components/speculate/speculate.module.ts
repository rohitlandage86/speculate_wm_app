import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeculateRoutingModule } from './speculate-routing.module';
import { SpeculateDashboardComponent } from './speculate-dashboard/speculate-dashboard.component';
import { SpeculateSidebarComponent } from './speculate-sidebar/speculate-sidebar.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SpeculateDashboardComponent,
    SpeculateSidebarComponent
  ],
  imports: [
    CommonModule,
    SpeculateRoutingModule,
    SharedModule,
  ]
})
export class SpeculateModule { }
