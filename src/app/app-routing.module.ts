import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
      //Home page routing
      { path: '',
         component: HomeComponent 
      },
  {
    path: "auth",
    loadChildren: () =>
      import("../app/components/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "gambler",
    loadChildren: () =>
      import("../app/components/gambler/gambler.module").then((m) => m.GamblerModule),
  },
  {
    path: "super-admin",
    loadChildren: () =>
      import("../app/components/super-admin/super-admin.module").then((m) => m.SuperAdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
