import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormArray,
  FormControl,
} from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  StepperOrientation,
  MatStepperModule,
} from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { Spot } from '../../interfaces/spot';
import { GlobalButtonComponent } from '../global-button/global-button.component';
import { GobalSelectListComponent } from '../gobal-select-list/gobal-select-list.component';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [
    MatIconModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
    MatRadioModule,
    CommonModule,
    ReactiveFormsModule,
    GlobalButtonComponent,
    GobalSelectListComponent,
  ],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css',
})
export class CarsComponent implements OnInit {
  // seats: string[] = Array(25).fill('B051B');
  // selectedSeats: number[] = [];
  // totalAmount: number = 300;

  // selectSeat(index: number) {
  //   if (this.isSeatUnavailable(index)) return;
  //   const seatIndex = this.selectedSeats.indexOf(index);

  //   if (seatIndex > -1) {
  //     this.selectedSeats.splice(seatIndex, 1);
  //   } else {
  //     this.selectedSeats.push(index);
  //   }

  //   this.calculateTotal();
  // }

  // isSeatUnavailable(index: number): boolean {
  //   // Add logic to check if a seat is unavailable
  //   return index === 1; // Example: Make seat 1 unavailable
  // }

  // calculateTotal() {
  //   // Update the total amount based on selected seats
  //   this.totalAmount = this.selectedSeats.length * 300;
  // } // chat gpt code was testing the picture

  spots: Spot[] = [];
  selectedSpots: Spot[] = [];
  selectedValue: any;
  form!: FormGroup;
  options = [
    {
      date: '23.09.2024',
      home: 'B056B, B056P, B056B, B056P, B056B, B056P',
      person: 'Piotr Gawara Company Sp. z o.o.',
      car: 'FZ9875J',
    },
    {
      date: '23.09.2024',
      home: 'B056B, B056P',
      person: 'Piotr Gawara Company Sp. z o.o.',
      car: 'FZ9875J',
    },
    {
      date: '23.09.2024',
      home: 'B056B, B056P',
      person: 'Piotr Gawara Company Sp. z o.o.',
      car: 'FZ9875J',
    },
  ];

  constructor(private fb: FormBuilder) {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    this.form = this.fb.group({
      selectedSpots: this.fb.array([]),
      options: FormControl,
    });
  }
  ngOnInit(): void {
    // Create 30 spot objects and add them to the spots array
    for (let i = 0; i < 30; i++) {
      this.spots.push({ id: i + 1, name: `B051B`, selected: false });
    }
    // Load persistent selections from localStorage
    this.loadSelections();
  }
///////////////////////////////////////////repeat by myself
  toggleSpot(spot: Spot) {
    spot.selected = !spot.selected;
    const selectedSpotsArray = this.form.get('selectedSpots') as FormArray;
    // Remove the spot from its current position
    this.spots = this.spots.filter((s) => s.id !== spot.id);
    // If selected, add to form array and move to beginning of spots array
    if (spot.selected) {
      selectedSpotsArray.push(this.fb.control(spot.id));
      // Move to beginning of array
      this.spots.unshift(spot);
    } else {
      // If deselected, remove from form array and move back to original position
      const index = selectedSpotsArray.controls.findIndex(
        (x) => x.value === spot.id
      );
      selectedSpotsArray.removeAt(index);
      // Separate selected and unselected spots
      const selectedSpots = this.spots.filter((s) => s.selected);
      const unselectedSpots = this.spots.filter((s) => !s.selected);
      // Sort unselected spots by their ID
      unselectedSpots.sort((a, b) => a.id - b.id);
      // Combine selected and sorted unselected spots
      this.spots = [...selectedSpots, ...unselectedSpots];
      // If the toggled spot was deselected, insert it in the correct position
      if (!spot.selected) {
        const insertIndex = this.spots.findIndex(
          (s) => !s.selected && s.id > spot.id
        );
        if (insertIndex === -1) {
          this.spots.push(spot);
        } else {
          this.spots.splice(insertIndex, 0, spot);
        }
      }
    }

    this.saveSelections();
  }

  saveSelections() {
    // localStorage.setItem(
    //   'selectedSpots',
    //   JSON.stringify(this.selectedSpots.map((s) => s.id))
    // );
    localStorage.setItem(
      'selectedSpots',
      JSON.stringify(this.form.get('selectedSpots')?.value)
    );
  }
  loadSelections() {
    const savedSelections = JSON.parse(
      localStorage.getItem('selectedSpots') || '[]'
    );
    savedSelections.forEach((id: number) => {
      const spot = this.spots.find((s) => s.id === id);
      if (spot) {
        this.toggleSpot(spot);
      }
    });
  }
  selectOrder(order: any) {
    this.form.get('selectedOrder')?.patchValue(order);
    //updates the part of the form when an order is selected.
  }
  onSubmit() {
    if (
      this.form.valid &&
      (this.form.get('selectedSpots') as FormArray).length >= 2
    ) {
      console.log(this.form.value);
    } else {
      console.log('Form is invalid or less than 2 spots selected');
    }
  }

  _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;
}
// when unselect it gets rendering without refresh && make a form to

// Expected form data
// Conditions must have 2 minimum selected partitions and selectedOrder
// {
//   selectedPartitions:[1,2,3],
//   selectedOrder :
//   {
//     date: '23.09.2024',
//     home: 'B056B, B056P',
//     person: 'Piotr Gawara Company Sp. z o.o.',
//     car: 'FZ9875J'
//   }
// }
//
//
