import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeculateDashboardComponent } from './speculate-dashboard/speculate-dashboard.component';
import { SpeculateSidebarComponent } from './speculate-sidebar/speculate-sidebar.component';
import { AuthGuard } from 'src/app/shared/auth-guard.service';

const routes: Routes = [
  { path: "", redirectTo: "speculate", pathMatch: "full" },
  
    {
    path: "speculate-dashboard",
    component: SpeculateDashboardComponent,
    pathMatch: "full",
    outlet: "speculate_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "speculate-sidebar",
    component: SpeculateSidebarComponent,
    pathMatch: "full",
    outlet: "speculate_Menu",
    canActivate:[AuthGuard]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeculateRoutingModule { }
