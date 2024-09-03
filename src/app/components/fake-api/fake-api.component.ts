import { Component, OnInit } from '@angular/core';
import { CallingApiService } from '../../services/calling-api.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { StoreProduct } from '../../interfaces/store-products';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-fake-api',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,CommonModule,MatProgressSpinnerModule,MatIcon],
  templateUrl: './fake-api.component.html',
  styleUrl: './fake-api.component.css'
})
export class FakeApiComponent implements OnInit {
  isLoading:boolean = false
constructor(private _calllingApi:CallingApiService){}
productList: StoreProduct[]=[]
ngOnInit(): void {
  this.getAllProducts()
}
getAllProducts(){
  this.isLoading= true
  this._calllingApi.getStoreProducts().subscribe({
    next:(res)=>{
      this.productList=res
      console.log(res)
      this.isLoading= false
    }
  })
}
}
