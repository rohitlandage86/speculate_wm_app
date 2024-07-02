import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamblerRoutingModule } from './gambler-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    GamblerRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class GamblerModule { }
