import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _userData = new Subject<boolean>();
  userData$ = this._userData.asObservable();
  
  private __isLoading = new Subject<boolean>();
  isLoading$ = this.__isLoading.asObservable();

  private __isLoading1 = new Subject<boolean>();
  isLoading1$ = this.__isLoading1.asObservable();
  //login and sign in 
  private _isLogin = new Subject<boolean>();
  isLogin$ = this._isLogin.asObservable();

  constructor(private http: HttpClient) { }
  getIPAddress(): Observable<any> {
    return this.http.get('https://api.ipify.org?format=json');
  }
  getCurrentPosition(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => resolve(position.coords),
          error => reject(error)
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }
//send user data
sendUserData(message: boolean) {
  this._userData.next(message);
}

setIsLogin(isLogin: boolean) {
  this._isLogin.next(isLogin)
}
setLoading(isLoading: any) {
  this.__isLoading.next(isLoading);
} 

setLoading1(isLoading1: any) {
  this.__isLoading1.next(isLoading1);
} 

}
