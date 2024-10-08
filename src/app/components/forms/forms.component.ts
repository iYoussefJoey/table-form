import {  Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MicroformsComponent } from '../microforms/microforms.component';
import { DateformsComponent } from '../dateforms/dateforms.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { chooseOneParentValidator } from '../../customValidator/chooseOneParent.validator';
import { Subscription } from 'rxjs';
import { otherFamMemberRequired } from '../../customValidator/otherRequireFam.validator';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    MicroformsComponent,
    MatCardModule,
    ReactiveFormsModule,
    DateformsComponent,
    MatRadioModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatFormField,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit  {
  registerForm: FormGroup;
  editIndex: number | null = null;
  buttonDisabled = true;



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      dOB: ['', [Validators.required, this.DOBvalid]],
      gender: ['', [Validators.required]],
      gradutionYear: [
        '',
        [Validators.required, this.DOBvalid, this.lastDecade],
      ],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      lastModificationDate: [''],
      studentParent: this.fb.array(
        [],
        [Validators.required, chooseOneParentValidator()]
      ), //this is to only select one mother & father // the error i was facing because i need to wrap validators in an array
      // or use   as AsyncValidatorFn to solve that
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editIndex = +params['id'];
        this.loadFormData();
      }
    });
  }
  DOBvalid(control: FormControl): { [key: string]: boolean } | null {
    const today = new Date();
    const dob = new Date(control.value);
    const minAllowedDate = new Date();
    minAllowedDate.setFullYear(today.getFullYear() - 120);
    if (dob > today || dob < minAllowedDate) {
      return {
        'Date cant be in the future and cant be 120 years ago youre not immortal ':
          true,
      };
      // this method prevents any future date from being entered and prevent any date less than 120 years ago from being entered
    }
    return null;
  }

  lastDecade(control: FormControl): { [key: string]: boolean } | null {
    const today = new Date();
    const dateOfGrad = new Date(control.value);
    // Calculate the minimum allowed date (10 years ago)
    const minAllowedDate = new Date();
    minAllowedDate.setFullYear(today.getFullYear() - 10);

    if (dateOfGrad > today || dateOfGrad < minAllowedDate) {
      return { 'Graudtion year cant be more than 10 years': true };
    } // grad date cant be in the future and cant be 10 years from now

    return null;
  }
  get studentParent() {
    return this.registerForm.get('studentParent') as FormArray;
  }

  addStudentParent() {
    const parentGroup = this.fb.group({
      familyMemberName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required]],
      familymember: ['', [Validators.required]],
      relationToStudent: ['',otherFamMemberRequired()],
    });
    parentGroup.get('familymember')?.valueChanges.subscribe((value) => {
      const relationControl = parentGroup.get('relationToStudent');
      if (value !== 'Other') {
        relationControl?.setValue(''); // Clear the input field
        relationControl?.clearValidators();
      } else {
        relationControl?.setValidators([Validators.required]);
      }
      relationControl?.updateValueAndValidity();
    });
    this.studentParent.push(parentGroup);
  }

  deleteFamilyMember(index: number) {
    this.studentParent.removeAt(index);
  }
  loadFormData(): void {
    const storedData = JSON.parse(localStorage.getItem('students') || '[]');
    if (this.editIndex !== null && storedData[this.editIndex]) {
      const data = storedData[this.editIndex];
      this.registerForm.patchValue(data);
      this.studentParent.clear();//clear existing form array items
       // Add the form array values
       data.studentParent.forEach((parent: any) => {
        const parentGroup = this.fb.group({
          familyMemberName: [parent.familyMemberName, Validators.required],
          familymember: [parent.familymember, Validators.required],
          phone: [parent.phone, Validators.required],
          relationToStudent: [parent.relationToStudent],// when editing populated with the stored data.
        });

        parentGroup.get('familymember')?.valueChanges.subscribe((value) => {
          const relationControl = parentGroup.get('relationToStudent');
          if (value !== 'Other') {
            relationControl?.setValue(''); // Clear the input field
            relationControl?.clearValidators();
          } else {
            relationControl?.setValidators([Validators.required]);
          }
          relationControl?.updateValueAndValidity();
        });

        this.studentParent.push(parentGroup);
      });
    }
  }
  submitForm(registerForm: FormGroup) {
    console.log(registerForm.value, registerForm.valid);
    if (this.registerForm.valid) {
      const updatedStudent = registerForm.value;
      let localtime = updatedStudent.lastModificationDate;
      localtime = new Date().toLocaleString(); // tolocalestring format the date and time acoording to the users's local settings
      updatedStudent.lastModificationDate = localtime;

      let formData = { ...this.registerForm.value };
      // Extract values and commented the below code beacuse i need to show the values in the form array in the form but dispaly it as string in the table so when edit it will show it as string

      // formData.studentParent = this.studentParent.value.map((parent:any)=>
      //   `${parent.familyMemberName} {${parent.relationToStudent}} {${parent.familymember}} {${parent.phone}}`);
      // this to spread the array from object to string so it doesnt show as object object

      let storedData = JSON.parse(localStorage.getItem('students') || '[]');
      //storing the data here and if its not an array then make it an array so i can show it
      if (!Array.isArray(storedData)) {
        storedData = [];
      }
      // this targets the index of the edit so it can target and edit only single object
      if (this.editIndex !== null) {
        storedData[this.editIndex] = formData; // update storedData element with the new form data
      } else {
        storedData.push(formData); //when its null mean the user creating new form not eidting an existing one then push it to the end of the array
      }

      localStorage.setItem('students', JSON.stringify(storedData)); //store ypdated data and converts array back to string
      this.router.navigate(['/table']);
    }
  }

  clearData() {
    this.registerForm.reset(); // reset all the forms data to NULL
  }
}
