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
     //get all sports data lists...............................................................
     getAllSportsDataLists(sport_id: any, betting_bet_type_id: any, betting_period_type_id:any,current_date:any,betting_market_type_id:any): Observable<any> {
      let params: any = {
        sport_id: sport_id,
          betting_bet_type_id: betting_bet_type_id,
          betting_period_type_id:betting_period_type_id,
          current_date:current_date,
          betting_market_type_id:betting_market_type_id,
      };

      return this.http.get(this.baseUrl + 'api/sports-data', {
          params: params
      });
  }
}
