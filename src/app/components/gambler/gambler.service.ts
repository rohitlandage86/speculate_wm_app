import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class GamblerService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  // get all sports............................................................
  getAllSportswmaList(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/sports/wma');
  }
  // get betting bet list sports filter by sports id
  getAllBettingbetwma(id:any): Observable<any>{
    return this.http.get(this.baseUrl + 'api/betting-bet-type/wma/'+id)
  }
    // get configuration sports by base_url
    getConfigurationbyBaseUrl(id:any): Observable<any>{
      return this.http.get(this.baseUrl + 'api/configuration/'+id)
    }
}
