import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
  //api
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  //get all organization list...............................................................
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
  //add new organization...
  addOrganization(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/organization', data);
  }
  //update organization...
  editOrganization(id: any, data: any,): Observable<any> {
    return this.http.put(this.baseUrl + 'api/organization/' + id, data);
  }
  // organization get by id ...
  getOrganizationById(id: any) {
    return this.http.get(this.baseUrl + 'api/organization/' + id)
  }
  //get All organization wma...
  getAllOrganizationwmaList(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/organization/wma');
  }

  //get all  organization user list................................................................................
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
    return this.http.get(this.baseUrl + 'api/organization-user', {
      params: params
    });
  }
  //add new organization User...
  addOrganizationUser(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/organization-user', data);
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
  // organization user enable disable
  organizationUserEnableDisable(id: any, status: any,): Observable<any> {
    const body = { status: status };
    let params = new HttpParams().set('status', status);
    return this.http.patch(this.baseUrl + 'api/organization-user/' + id, body, {
      params: params
    });
  }

  //get all  sports list............................................................................................
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
  //add new Sports...
  addSports(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/sports', data);
  }
  //update Sports...
  editSports(id: any, data: any,): Observable<any> {
    return this.http.put(this.baseUrl + 'api/sports/' + id, data);
  }
  // Sports get by id ...
  getSportsById(id: any) {
    return this.http.get(this.baseUrl + 'api/sports/' + id)
  }
  //get All Sports wma...
  getAllSportswmaList(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/sports/wma');
  }
  //  sports enable disable
  sportsEnableDisable(id: any, status: any,): Observable<any> {
    const body = { status: status };
    let params = new HttpParams().set('status', status);
    return this.http.patch(this.baseUrl + 'api/sports/' + id, body, {
      params: params
    });
  }

  //get all  states list........................................................................................
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
  //add new states...
  addStates(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/state', data);
  }
  //update states...
  editStates(id: any, data: any,): Observable<any> {
    return this.http.put(this.baseUrl + 'api/state/' + id, data);
  }
  // states get by id ...
  getStatesById(id: any) {
    return this.http.get(this.baseUrl + 'api/state/' + id)
  }
  //  states enable disable
  statesEnableDisable(id: any, status: any,): Observable<any> {
    const body = { status: status };
    let params = new HttpParams().set('status', status);
    return this.http.patch(this.baseUrl + 'api/state/' + id, body, {
      params: params
    });
  }

  //get all  betting event type list......................................................................................
  getAllBettingEventTypeList(page: any, perPage: any): Observable<any> {
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
    return this.http.get(this.baseUrl + 'api/betting-event-type/', {
      params: params
    });
  }
  //add new betting event type...
  addBettingEventType(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/betting-event-type', data);
  }
  //update betting event type...
  editBettingEventType(id: any, data: any,): Observable<any> {
    return this.http.put(this.baseUrl + 'api/betting-event-type/' + id, data);
  }
  // betting event type get by id ...
  getBettingEventTypeById(id: any) {
    return this.http.get(this.baseUrl + 'api/betting-event-type/' + id)
  }
  //  Betting event enable disable
  bettingEventEnableDisable(id: any, status: any,): Observable<any> {
    const body = { status: status };
    let params = new HttpParams().set('status', status);
    return this.http.patch(this.baseUrl + 'api/betting-event-type/' + id, body, {
      params: params
    });
  }

  //get all  betting market type list........................................................................................
  getAllBettingMarketTypeList(page: any, perPage: any): Observable<any> {
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
    return this.http.get(this.baseUrl + 'api/betting-market-type/', {
      params: params
    });
  }
  //add new betting market type...
  addBettingMarketType(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/betting-market-type', data);
  }
  //update betting market type...
  editBettingMarketType(id: any, data: any,): Observable<any> {
    return this.http.put(this.baseUrl + 'api/betting-market-type/' + id, data);
  }
  // betting market type get by id ...
  getBettingMarketTypeById(id: any) {
    return this.http.get(this.baseUrl + 'api/betting-market-type/' + id)
  }
  //  Betting market enable disable
  bettingMarketEnableDisable(id: any, status: any,): Observable<any> {
    const body = { status: status };
    let params = new HttpParams().set('status', status);
    return this.http.patch(this.baseUrl + 'api/betting-market-type/' + id, body, {
      params: params
    });
  }

  //get all  betting outcome type list.........................................................................................................
  getAllBettingOutcomeTypeList(page: any, perPage: any): Observable<any> {
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
    return this.http.get(this.baseUrl + 'api/betting-outcome-type/', {
      params: params
    });
  }
  //add new betting outcome type...
  addBettingOutcomeType(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/betting-outcome-type', data);
  }
  //update betting outcome type...
  editBettingOutcomeType(id: any, data: any,): Observable<any> {
    return this.http.put(this.baseUrl + 'api/betting-outcome-type/' + id, data);
  }
  // betting outcome type get by id ...
  getBettingOutcomeTypeById(id: any) {
    return this.http.get(this.baseUrl + 'api/betting-outcome-type/' + id)
  }
  //  Betting outcome enable disable
  bettingOutcomeEnableDisable(id: any, status: any,): Observable<any> {
    const body = { status: status };
    let params = new HttpParams().set('status', status);
    return this.http.patch(this.baseUrl + 'api/betting-outcome-type/' + id, body, {
      params: params
    });
  }

  //get all  betting period type list............................................................................................................
  getAllBettingPeriodTypeList(page: any, perPage: any): Observable<any> {
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
    return this.http.get(this.baseUrl + 'api/betting-period-type/', {
      params: params
    });
  }
  //add new betting period type...
  addBettingPeriodType(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/betting-period-type', data);
  }
  //update betting period type...
  editBettingPeriodType(id: any, data: any,): Observable<any> {
    return this.http.put(this.baseUrl + 'api/betting-period-type/' + id, data);
  }
  // betting period type get by id ...
  getBettingPeriodTypeById(id: any) {
    return this.http.get(this.baseUrl + 'api/betting-period-type/' + id)
  }
  //  BettingPeriod enable disable
  bettingPeriodEnableDisable(id: any, status: any,): Observable<any> {
    const body = { status: status };
    let params = new HttpParams().set('status', status);
    return this.http.patch(this.baseUrl + 'api/betting-period-type/' + id, body, {
      params: params
    });
  }

  //get all  Configuration list................................................................................................................
  getAllConfigurationList(page: any, perPage: any): Observable<any> {
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
    return this.http.get(this.baseUrl + 'api/configuration/', {
      params: params
    });
  }
  //add new configuration...
  addConfiguration(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/configuration', data);
  }
  //update configuration...
  editConfiguration(id: any, data: any,): Observable<any> {
    return this.http.put(this.baseUrl + 'api/configuration/' + id, data);
  }
  //  configuration get by id ...
  getConfigurationById(id: any) {
    return this.http.get(this.baseUrl + 'api/configuration/' + id)
  }
  //  configuration enable disable
  configurationEnableDisable(id: any, status: any,): Observable<any> {
    const body = { status: status };
    let params = new HttpParams().set('status', status);
    return this.http.patch(this.baseUrl + 'api/configuration/' + id, body, {
      params: params
    });
  }
}
