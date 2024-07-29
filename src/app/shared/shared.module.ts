import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatStepperModule,
    HttpClientModule,
    MatPaginatorModule,
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatStepperModule,
    HttpClientModule,
    MatPaginatorModule
  ]
})
export class SharedModule { }
