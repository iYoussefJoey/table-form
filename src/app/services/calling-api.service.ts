import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreProduct } from '../interfaces/store-products';
import { NationPopulation, NationPopulationResponse } from '../interfaces/nation-population';
import { BitCoin } from '../interfaces/bit-coin';

@Injectable({
  providedIn: 'root'
})
export class CallingApiService {

  constructor(private _httpClient:HttpClient) { }
  getBitCoins():Observable<BitCoin>{
   return  this._httpClient.get<BitCoin>('https://api.coindesk.com/v1/bpi/currentprice.json')
  }
  getNationAndPopulation():Observable<NationPopulationResponse>{
   return  this._httpClient.get<NationPopulationResponse>('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
  }
  getStoreProducts():Observable<StoreProduct[]> {
    return this._httpClient.get<StoreProduct[]> ('https://fakestoreapi.com/products')
  }
}
