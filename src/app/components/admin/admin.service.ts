import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  //api
  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  //get all  organization list....................................................................
  getAllOrganizationList(page: any, perPage: any): Observable<any> {
    let params: any = {
      page: page,
      perPage: perPage
    };

    // Check if page or perPage is empty and remove them from params if so
    if (page === '' || perPage === '') {
      delete params.page;
      delete params.perPage;
    }

    // Make the HTTP GET request
    return this.http.get(this.baseUrl + 'api/organization/', {
      params: params
    });
  }
  // organization get by id ...
  getOrganizationById(id: any) {
    return this.http.get(this.baseUrl + 'api/organization/' + id)
  }

  //get all  organization user list......................................................................................
  getAllOrganizationUserList(page: any, perPage: any): Observable<any> {
    let params: any = {
      page: page,
      perPage: perPage
    };
    // Check if page or perPage is empty and remove them from params if so
    if (page === '' || perPage === '') {
      delete params.page;
      delete params.perPage;
    }
    // Make the HTTP GET request
    return this.http.get(this.baseUrl + 'api/organization-user/', {
      params: params
    });
  }
  //update organization User...
  editOrganizationUser(id: any, data: any,): Observable<any> {
    return this.http.put(this.baseUrl + 'api/organization-user/' + id, data);
  }
  // organization User get by id ...
  getOrganizationUserById(id: any) {
    return this.http.get(this.baseUrl + 'api/organization-user/' + id)
  }
  //get All organization user type...
  getAllOrganizationUserTypeList(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/super-admin/user-type');
  }
  //get All organization wma...
  getAllOrganizationwmaList(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/organization/wma');
  }

  //get all  sports list.................................................................................
  getAllSportsList(page: any, perPage: any): Observable<any> {
    let params: any = {
      page: page,
      perPage: perPage
    };

    // Check if page or perPage is empty and remove them from params if so
    if (page === '' || perPage === '') {
      delete params.page;
      delete params.perPage;
    }

    // Make the HTTP GET request
    return this.http.get(this.baseUrl + 'api/sports/', {
      params: params
    });
  }
  // Sports get by id ...
  getSportsById(id: any) {
    return this.http.get(this.baseUrl + 'api/sports/' + id)
  }
  //get All Sports wma...
  getAllSportswmaList(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/sports/wma');
  }

  //get all  states list........................................................................
  getAllStatesList(page: any, perPage: any): Observable<any> {
    let params: any = {
      page: page,
      perPage: perPage
    };

    // Check if page or perPage is empty and remove them from params if so
    if (page === '' || perPage === '') {
      delete params.page;
      delete params.perPage;
    }

    // Make the HTTP GET request
    return this.http.get(this.baseUrl + 'api/state/', {
      params: params
    });
  }
  //update states...
  editStates(id: any, data: any,): Observable<any> {
    return this.http.put(this.baseUrl + 'api/state/' + id, data);
  }
  // states get by id ...
  getStatesById(id: any) {
    return this.http.get(this.baseUrl + 'api/state/' + id)
  }
  //get all  Gambling list
  getAllGamblersList(page: any, perPage: any): Observable<any> {
    let params: any = {
      page: page,
      perPage: perPage
    };
    // Check if page or perPage is empty and remove them from params if so
    if (page === '' || perPage === '') {
      delete params.page;
      delete params.perPage;
    }
    // Make the HTTP GET request
    return this.http.get(this.baseUrl + 'api/gambler/', {
      params: params
    });
  }
  // Gamblers get by id ...
  getGamblersById(id: any) {
    return this.http.get(this.baseUrl + 'api/gambler/' + id)
  }
}
