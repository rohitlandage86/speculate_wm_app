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
  isAdmin = false;
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
          this.isAdmin = false;
          this.isGamblerDashboard = false;
        } else if (currentRoute === '/' ) {
          this.isHomePage = true;
          this.isSignUp = false;
          this.isSuperadmin = false;
          this.isAdmin = false;
        } else if (currentRoute?.split('/')[1] === 'super-admin') {
          this.isHomePage = false;
          this.isSignUp = false;
          this.isSuperadmin = true;
          this.isAdmin = false;
        }else if (currentRoute?.split('/')[1] === 'admin') {
          this.isAdmin = true;
          this.isSignUp = false;
          this.isHomePage = false;
          this.isSuperadmin = false;
          this.isGamblerDashboard = false;
        } else {
          this.isHomePage = false;
          this.isSignUp = false;
          this.isSuperadmin = false;
          this.isAdmin = false;
        }
        // console.log(currentRoute);
        
  }
  
}
