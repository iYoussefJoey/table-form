import { Component, Input } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-gobal-select-list',
  standalone: true,
  imports: [MatFormFieldModule,MatSelectModule,CommonModule],
  templateUrl: './gobal-select-list.component.html',
  styleUrl: './gobal-select-list.component.css'
})
export class GobalSelectListComponent {
}
