import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './shared/auth-guard.service';
import { AuthInterceptor } from './shared/auth-interceptor.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton:true
    }),
  ],
  providers: [ AuthGuard,
    Title
    ,provideAnimations(), // required animations providers
  provideToastr(), provideAnimations(), // Toastr providers
  {  
    provide: HTTP_INTERCEPTORS,  
    useClass: AuthInterceptor,  
    multi: true  
  },
  { provide: LocationStrategy, useClass: HashLocationStrategy }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
