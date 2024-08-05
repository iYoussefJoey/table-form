import { Component, Input, Type } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-microforms',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './microforms.component.html',
  styleUrl: './microforms.component.css',
})
export class MicroformsComponent {
  public registerForm!: FormGroup;
  public control!: FormControl;
  @Input() controlName!: string;
  @Input() label: string = '';
  @Input() placeholder!: string;
  @Input() type!: string;
  constructor(public controlContainer: ControlContainer) {}

  ngOnInit() {
    this.registerForm = <FormGroup>this.controlContainer.control;
    this.control = <FormControl>this.registerForm.get(this.controlName);
    //casting the control to FormControl
  }

  getErrors(): string[] {
    if (this.control && this.control.dirty && this.control.invalid) {
      let errors = this.control?.errors;
      // console.log('Error titles:', errorTitles);
      if (errors) {
        return Object.keys(errors);
      }
    }
    return [];
  }
}
