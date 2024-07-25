import { Component, OnInit } from '@angular/core';
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
    MatInputModule
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit {
  registerForm: FormGroup;
  editIndex: number | null = null;


  constructor(private fb: FormBuilder, private router:Router,private route: ActivatedRoute) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      dOB: ['', [Validators.required,this.DOBvalid]],
      gender: ['', [Validators.required]],
      gradutionYear: ['', [Validators.required,this.DOBvalid,this.lastDecade]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      familymember:['',[Validators.required]],
      lastModificationDate: [''],
      studentParent: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editIndex = +params['id'];
        this.loadFormData();
      }
    });
  }
  DOBvalid(control:FormControl):{[key:string] :  boolean} | null {
    const today = new Date();
    const dob = new Date(control.value);
    const minAllowedDate = new Date();
    minAllowedDate.setFullYear(today.getFullYear() - 120);
    if (dob > today || dob < minAllowedDate)      {
        return {'Date cant be in the future and cant be 120 years ago youre not immortal ':true};      
         // this method prevents any future date from being entered and prevent any date less than 120 years ago from being entered

      }
      return null;
        
  }

  lastDecade(control:FormControl):{[key:string] :  boolean} | null {
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
      relationToStudent: ['', [Validators.required]]
    });
    this.studentParent.push(parentGroup);
  }

  deleteFamilyMember(index: number) {
    this.studentParent.removeAt(index);
  }
  loadFormData(): void {
    const storedData = JSON.parse(localStorage.getItem('registerForm') || '[]');
    if (this.editIndex !== null && storedData[this.editIndex]) {
      const data = storedData[this.editIndex];
      this.registerForm.patchValue(data); // a small error i cant show the values in the form array! saved for later to solve
      data.studentParent.forEach((parent: any) => {
        this.studentParent.push(this.fb.group({
          familyMemberName: [parent.familyMemberName, Validators.required],
          phone: [parent.phone, Validators.required],
          relationToStudent: [parent.relationToStudent, Validators.required],
        }));
      });
    }
  }

  submitForm(registerForm: FormGroup) {
    console.log(registerForm.value, registerForm.valid);
    if (this.registerForm.valid) {

      const updatedStudent = registerForm.value;
      let localtime = updatedStudent.lastModificationDate;
      localtime = new Date().toLocaleString(); // tolocalestring format the date and time acoording to the users's local settings
      updatedStudent.lastModificationDate = localtime 

      let formData = this.registerForm.value; // Extract values
      formData.studentParent = this.studentParent.value.map((parent:any)=>
        `{${parent.familyMemberName}} {${parent.relationToStudent}} {${parent.phone}}`);
       // this to spread the array from object to string so it doesnt show as object object

      let storedData = JSON.parse(localStorage.getItem('registerForm') || '[]');
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

      localStorage.setItem('registerForm', JSON.stringify(storedData)); //store ypdated data and converts array back to string
      this.router.navigate(['/table']);

    }
  }
  
  clearData(){
    this.registerForm.reset(); // reset all the forms data to NULL
  }
}
