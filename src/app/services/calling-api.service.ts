import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallingApiService {

  constructor(private _httpClient:HttpClient) { }
  getBitCoins():Observable<any>{
   return  this._httpClient.get('https://api.coindesk.com/v1/bpi/currentprice.json')
  }
  getNationAndPopulation():Observable<any>{
   return  this._httpClient.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
  }
}
