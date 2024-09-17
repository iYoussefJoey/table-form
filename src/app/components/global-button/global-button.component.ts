import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { TranslatePipe } from '../../pipes/translate.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-global-button',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,CommonModule,MatIconModule,TranslatePipe,MatProgressSpinnerModule],
  templateUrl: './global-button.component.html',
  styleUrl: './global-button.component.css'
})
export class GlobalButtonComponent {
@Input() name: string = '';
@Input() buttonwidth!:string 
@Input() bgcolor!:string 
@Input() icons!:string
@Input() disabled!:boolean
@Input() isLoading:boolean = false
@Input() buttonId!:string
@Output() buttonClick:EventEmitter<string> = new EventEmitter<string>();

onClick(){
  this.buttonClick.emit();
}

}
