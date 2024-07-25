import { Component, Input } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dateforms',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,MatCardModule, MatInputModule, MatDatepickerModule,ReactiveFormsModule,CommonModule],
  templateUrl: './dateforms.component.html',
  styleUrl: './dateforms.component.css'
})
export class DateformsComponent {
  public registerForm!: FormGroup;
  public control!: FormControl;
  @Input() controlName!: string;
  @Input() label: string = '';
  @Input() placeholder!: string;
  // @Output() consoleRegister = new EventEmitter<string>()
  constructor(public controlContainer: ControlContainer) {}

  ngOnInit() {
    this.registerForm = <FormGroup>this.controlContainer.control;
    this.control = <FormControl>this.registerForm.get(this.controlName);
  }
  getErrors(): string[] {
    if(this.control && this.control.dirty && this.control.invalid){
      let errors = this.control?.errors;
    // console.log('Error titles:', errorTitles);
      if(errors){
      
        return Object.keys(errors);
      }
    }
    return [];
  }

}
