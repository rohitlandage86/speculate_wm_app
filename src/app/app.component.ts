import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked{
  title = 'speculate_wm_app';
  isSignUp = false;
  isHomePage: boolean = false;
  isSuperadmin = false;

  
  isSpeculateDashboard = false;
  isGamblerDashboard = false;


  constructor(private router: Router) {}

  ngOnInit(): void {
   
  }
  ngAfterContentChecked() {
    const currentRoute = this.router.routerState.snapshot.url;
        if (currentRoute === '/auth/sign-up' || currentRoute === '/auth/login' ) {
          this.isSignUp = true;
          this.isHomePage = false;
          this.isSuperadmin = false;
          this.isSpeculateDashboard = false;

        } else if (currentRoute === '/' ) {
          this.isHomePage = true;
          this.isSignUp = false;
          this.isSuperadmin = false;
          this.isSpeculateDashboard = false;
        } else if (currentRoute?.split('/')[1] === 'super-admin') {
          this.isHomePage = false;
          this.isSignUp = false;
          this.isSuperadmin = true;
          this.isSpeculateDashboard = false;
        }else if (currentRoute?.split('/')[1] === 'speculate') {
          this.isSpeculateDashboard = true;
          this.isSignUp = false;
          this.isHomePage = false;
          this.isSuperadmin = false;
         } else {
          this.isHomePage = false;
          this.isSignUp = false;
          this.isSuperadmin = false;
          this.isSpeculateDashboard = false;
        }
        // console.log(currentRoute);
        
  }
  
}
