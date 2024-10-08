import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CallingApiService } from '../../services/calling-api.service';
import { RemoveSpacesPipe } from '../../pipes/remove-spaces.pipe';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  NationPopulation,
  NationPopulationResponse,
} from '../../interfaces/nation-population';

@Component({
  selector: 'app-nation-population',
  standalone: true,
  imports: [
    CommonModule,
    RemoveSpacesPipe,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './nation-population.component.html',
  styleUrl: './nation-population.component.css',
})
export class NationPopulationComponent implements OnInit {
  isLoading: boolean = false;
  displayedColumns: string[] = [
    'ID Nation',
    'ID Year',
    'Nation',
    'Population',
    'Slug Nation',
    'Year',
  ];
  dataSource: MatTableDataSource<NationPopulation>;
  constructor(private callingapi: CallingApiService) {
    this.dataSource = new MatTableDataSource<NationPopulation>([]); // Initialize with an empty array of NationPopulation
    //ensure that your template has a valid, non-undefined dataSource from the start
  }

  ngOnInit(): void {
    // this.isLoading = true;
    // setTimeout(() => {
    //   this.isLoading= false;
    // }, 1000);
    this.getPopultionInUSA();
  }
  getPopultionInUSA() {
    this.isLoading = true;
    this.callingapi.getNationAndPopulation().subscribe((data) => {
      this.dataSource.data = data.data;
      // const dataView = data.data.map((item:any)=>({
      //   //this map solves the problem of 'ID Nation' the spaces but i made a pipe was trying first without table to show the data
      //   IDNation : item['ID Nation'],
      //   IDYear : item['ID Year'],
      //   Nation : item['Nation'],
      //   Population : item['Population'],
      //   SlugNation : item['Slug Nation'],
      //   Year : item['Year']
      // }));
      // this.dataSource.data = dataView
      console.log(this.dataSource.data);
      this.isLoading = false;
    });
  }
}
