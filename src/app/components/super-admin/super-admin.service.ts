import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SuperAdminService {
 //api
 url = "http://localhost:3000/v1/"
 httpHeaders = new HttpHeaders({
   'Content-Type': 'application/json'
 });
    constructor(private http: HttpClient) { }
  //get all  organization list
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
        return this.http.get(this.url + 'api/organization/', {
            params: params
        });
    }

       //add new organization...
       addOrganization(data: any): Observable<any> {
        return this.http.post(this.url + 'api/organization', data);
    }
     //update organization...
     editOrganization(id: any,data: any,): Observable<any> {
        return this.http.put(this.url + 'api/organization/' + id, data);

    }
      // organization get by id ...
      getOrganizationById(id:any){
        return this.http.get(this.url+'api/organization/'+id)
      }

 //get all  organization user list
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
  return this.http.get(this.url + 'api/organization-user/', {
      params: params
  });
}
 //add new organization User...
 addOrganizationUser(data: any): Observable<any> {
  return this.http.post(this.url + 'api/organization-user', data);
}
//update organization User...
editOrganizationUser(id: any,data: any,): Observable<any> {
  return this.http.put(this.url + 'api/organization-user/' + id, data);

}
// organization User get by id ...
getOrganizationUserById(id:any){
  return this.http.get(this.url+'api/organization-user/'+id)
}
 //get All organization user type...
 getAllOrganizationUserTypeList(): Observable<any> {
  return this.http.get(this.url + 'api/super-admin/user-type');
}
 //get All organization wma...
 getAllOrganizationwmaList(): Observable<any> {
  return this.http.get(this.url + 'api/organization/wma');
}


 //get all  sports list
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
  return this.http.get(this.url + 'api/sports/', {
      params: params
  });
}
 //add new Sports...
 addSports(data: any): Observable<any> {
  return this.http.post(this.url + 'api/sports', data);
}
//update Sports...
editSports(id: any,data: any,): Observable<any> {
  return this.http.put(this.url + 'api/sports/' + id, data);

}
// Sports get by id ...
getSportsById(id:any){
  return this.http.get(this.url+'api/sports/'+id)
}
 //get All Sports wma...
 getAllSportswmaList(): Observable<any> {
  return this.http.get(this.url + 'api/sports/wma');
}
//get all  states list
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
  return this.http.get(this.url + 'api/state/', {
      params: params
  });
}
 //add new states...
 addStates(data: any): Observable<any> {
  return this.http.post(this.url + 'api/state', data);
}
//update states...
editStates(id: any,data: any,): Observable<any> {
  return this.http.put(this.url + 'api/state/' + id, data);

}
// states get by id ...
getStatesById(id:any){
  return this.http.get(this.url+'api/state/'+id)
}


//get all  betting event type list

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
  return this.http.get(this.url + 'api/betting-event-type/', {
      params: params
  });
}
 //add new betting event type...
 addBettingEventType(data: any): Observable<any> {
  return this.http.post(this.url + 'api/betting-event-type', data);
}
//update betting event type...
editBettingEventType(id: any,data: any,): Observable<any> {
  return this.http.put(this.url + 'api/betting-event-type/' + id, data);

}
// betting event type get by id ...
getBettingEventTypeById(id:any){
  return this.http.get(this.url+'api/betting-event-type/'+id)
}

//get all  betting market type list

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
  return this.http.get(this.url + 'api/betting-market-type/', {
      params: params
  });
}
 //add new betting market type...
 addBettingMarketType(data: any): Observable<any> {
  return this.http.post(this.url + 'api/betting-market-type', data);
}
//update betting event type...
editBettingMarketType(id: any,data: any,): Observable<any> {
  return this.http.put(this.url + 'api/betting-market-type/' + id, data);

}
// betting event type get by id ...
getBettingMarketTypeById(id:any){
  return this.http.get(this.url+'api/betting-market-type/'+id)
}

//get all  betting outcome type list
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
  return this.http.get(this.url + 'api/betting-outcome-type/', {
      params: params
  });
}
 //add new betting outcome type...
 addBettingOutcomeType(data: any): Observable<any> {
  return this.http.post(this.url + 'api/betting-outcome-type', data);
}
//update betting outcome type...
editBettingOutcomeType(id: any,data: any,): Observable<any> {
  return this.http.put(this.url + 'api/betting-outcome-type/' + id, data);

}
// betting outcome type get by id ...
getBettingOutcomeTypeById(id:any){
  return this.http.get(this.url+'api/betting-outcome-type/'+id)
}

//get all  betting period type list
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
  return this.http.get(this.url + 'api/betting-period-type/', {
      params: params
  });
}
 //add new betting period type...
 addBettingPeriodType(data: any): Observable<any> {
  return this.http.post(this.url + 'api/betting-period-type', data);
}
//update betting period type...
editBettingPeriodType(id: any,data: any,): Observable<any> {
  return this.http.put(this.url + 'api/betting-period-type/' + id, data);

}
// betting period type get by id ...
getBettingPeriodTypeById(id:any){
  return this.http.get(this.url+'api/betting-period-type/'+id)
}


//get all  Configuration list
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
  return this.http.get(this.url + 'api/configuration/', {
      params: params
  });
}
 //add new configuration...
 addConfiguration(data: any): Observable<any> {
  return this.http.post(this.url + 'api/configuration', data);
}
//update configuration...
editConfiguration(id: any,data: any,): Observable<any> {
  return this.http.put(this.url + 'api/configuration/' + id, data);

}
//  configuration get by id ...
getConfigurationById(id:any){
  return this.http.get(this.url+'api/configuration/'+id)
}
}
