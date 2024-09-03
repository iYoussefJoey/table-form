import { Component, OnInit } from '@angular/core';
import { CallingApiService } from '../../services/calling-api.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BitCoin, transforedBitCoin } from '../../interfaces/bit-coin';

@Component({
  selector: 'app-coin-prices',
  standalone: true,
  imports: [CommonModule, MatTableModule,MatProgressSpinnerModule],
  templateUrl: './coin-prices.component.html',
  styleUrls: ['./coin-prices.component.css'],
})
export class CoinPricesComponent implements OnInit {
  coins : MatTableDataSource<transforedBitCoin>;
  displayedColumns: string[] = ['timeUpdated', 'timeUpdatedISO', 'timeUpdatedUK', 'chartName', 'currency', 'rate', 'description'];
  disclaimer: string = '';
  isLoading:boolean=false;


  constructor(private apiService: CallingApiService) {
    this.coins = new MatTableDataSource<transforedBitCoin>([]);
  }

  ngOnInit(): void {
    this.getCoinsCurrency();
  }
  getCoinsCurrency() {
    this.isLoading = true;
    this.apiService.getBitCoins().subscribe((data) => {
      // console.log(data);
      console.table(data);
      const coinsArray = this.transformData(data); //passed to it to proccess it and return the data in a different format 
      this.coins.data = coinsArray;
      this.disclaimer = data.disclaimer;
      this.isLoading=false
    });
  }
  transformData(data: BitCoin): transforedBitCoin[] 
  //this method takes the data and returns an array of object 
  {
    const coinsArray:transforedBitCoin[] = [];
    for (const key in data.bpi)
      // this loops through each key and is data.bpi is an object
      {
      if (data.bpi.hasOwnProperty(key)) {
        // key is to loop over the 3 currency objects
        coinsArray.push({
          timeUpdated: data.time.updated,
          timeUpdatedISO: data.time.updatedISO,
          timeUpdatedUK: data.time.updateduk,
          chartName: data.chartName,
          currency: key,
          rate: data.bpi[key].rate,
          description: data.bpi[key].description,
        });
      }
    }
    return coinsArray; 
    // after the loop is complete it returns the array got all transformed data!
  } // understand this is important ****************
}
