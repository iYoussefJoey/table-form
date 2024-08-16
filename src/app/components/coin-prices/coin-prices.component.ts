import { Component, OnInit } from '@angular/core';
import { CallingApiService } from '../../services/calling-api.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-coin-prices',
  standalone: true,
  imports: [CommonModule, MatTableModule,MatProgressSpinnerModule],
  templateUrl: './coin-prices.component.html',
  styleUrls: ['./coin-prices.component.css'],
})
export class CoinPricesComponent implements OnInit {
  coins = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['timeUpdated', 'timeUpdatedISO', 'timeUpdatedUK', 'chartName', 'currency', 'rate', 'description'];
  disclaimer: string = '';
  isLoading:boolean=false;


  constructor(private apiService: CallingApiService) {}

  ngOnInit(): void {
    this.getCoinsCurrency();
  }
  getCoinsCurrency() {
    this.isLoading = true;
    this.apiService.getBitCoins().subscribe((data) => {
      // console.log(data);
      console.table(data);
      const coinsArray = this.transformData(data);
      this.coins.data = coinsArray;
      this.disclaimer = data.disclaimer;
      this.isLoading=false
    });
  }
  transformData(data: any): any[] {
    const coinsArray = [];
    for (const key in data.bpi) {
      if (data.bpi.hasOwnProperty(key)) {
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
  } // understand this is important ****************
}
