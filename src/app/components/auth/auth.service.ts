import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //api
  url = "http://localhost:3000/v1/"
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }
     //ip address
     public getIPAddress()  
     {  
       return this.http.get("http://api.ipify.org/?format=json");  
     } 
  //login
  login(data:any):Observable<any>{
    return this.http.post(this.url+"api/super-admin/login",data,{
      headers:this.httpHeaders
    });
  }
  //   //sign-up
  signUp(data: any) {
    return this.http.post(this.url + 'api/gambler/signup', data);
  }
     //state list
     allstateList(){
      return this.http.get(this.url + 'api/state/wma');
    }
   
 public isAuthenticated(): boolean {
  return this.getToken() !== null;
}

  getToken() {
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken != null) {
      return accessToken;
    }
    return null;
  }
}
