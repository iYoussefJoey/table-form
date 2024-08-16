import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeldialogComponent } from '../deldialog/deldialog.component';
import { TokenService } from '../../token.service';
import { NameFormatTypes } from '../../enums/name-format-type.enum';
import { FormsComponent } from '../forms/forms.component';
import { FormGroup } from '@angular/forms';
import { UserSettingsComponent } from '../user-settings/user-settings.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    CdkDropList,
    CommonModule,
    RouterModule,
    DragDropModule,
    MatButtonModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements AfterViewInit, OnInit {
  // @ViewChild is a decorator that used to access and interact with a child component
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>; //@Viewchild used to get refereces to all 3 above references
  displayedColumns!: string[];
  dataSource = new MatTableDataSource<any>([]); // datasource used to show the data in the table
  readonly dialog = inject(MatDialog);
  nameStyle!: NameFormatTypes;
  pageSize = 5; // Default page size
  userName:string = 'User';


  constructor(private router: Router, private tokenserv: TokenService) {}
  ngOnInit(): void {
  this.loadSettings()
    this.nameStyle = this.tokenserv.getNameStyle();
    this.loadData();
    this.userName = this.tokenserv.getUsername() || 'User';

  } //lifecycle hook .. angular made it so we can use logic on here but it gets intialized after constructor
  ngAfterViewInit(): void {
    this.initializeTableSettings()
  }
  // lifecycle hook.... used ngAfterViewInIt Initializes pagination and sorting after the view has been fully initialized.
  loadSettings() {
    const cols = localStorage.getItem('cols');

    if (cols) {
      this.displayedColumns = JSON.parse(cols);
    } else {
      this.displayedColumns = [
        'fullName',
        'dOB',
        'gender',
        'gradutionYear',
        'phone',
        'email',
        'lastModificationDate',
        'studentParent',
        'actions',
      ];
    }
  }
  initializeTableSettings() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData() {
    let students: any = JSON.parse(localStorage.getItem('students') || '[]');
    //getting the data in OldData from local storage and parse it to json if register doesnt exit make it empty array
    if (Array.isArray(students)) {
      // chech if the data is an array 
      this.dataSource.data = students.map((student) => ({
        ...student, // ... This is the spread operator, which creates a new object that includes all properties of the original object
        fullName: this.getFullName(student), // made the clone here to show it only as a string but in the acutal part its a object so i can edit!
        studentParent:student.studentParent.map((parent:any) => 
          `${parent.familyMemberName} {${parent.relationToStudent}} {${parent.familymember}} {${parent.phone}}` ).join('')//join('') method concatenates these strings into a single string.
        //differnce between toString() & join() both returns string but join() i can make it add spaces betweeen strings and toString() will only make it coma (, )
      })); // Create a new reference
    } // if old data is an array then put it to the data source
    else { 
      this.dataSource.data = []; // if the OlData is no not an array ten set the data to an empty array
    }
    console.log(this.dataSource.data);
  }
  getFullName(student: any) {
    if (this.nameStyle == NameFormatTypes.FIRSTNAME_LASTNAME) {
      return `${student.firstname} ${student.lastname}`;
    } else if (this.nameStyle == NameFormatTypes.LASTNAME_FIRSTNAME) {
      return `${student.lastname} ${student.firstname}`;
    }
    // localStorage.setItem('nameStyle', JSON.stringify(this.tokenserv.getNameStyle()));
    return student.fullName;
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /*
   * used applyFilter to filter the whole table to get any value in any Column
   *it uses MatTableDataSource filter property and used to trim to remove white spaces and to lower case to change all input to lower case to match
   */

  updateDisplayedColumns(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex,
      event.currentIndex
    );
    this.displayedColumns = [...this.displayedColumns]; // Create a new reference
    this.table.renderRows();
    localStorage.setItem('cols', JSON.stringify(this.displayedColumns));
    // it handles the column drag and drop to rearrange the column if needed
    //used moveItemInArray to update the displayedcolums array and force it to render with new col order
  }

  deleteRow(index: number) {
    const student = this.dataSource.data[index]; // get the student to be deleted
    const dialogRef = this.dialog.open(DeldialogComponent, {
      // open the delete dialog
      data: {
        firstname: student.firstname, // send the data to the dialog
        lastname: student.lastname,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // get the result of the dialog
      if (result == true) {
        // if it is true then delete it
        const storedData = JSON.parse(localStorage.getItem('students') || '[]');
        if (Array.isArray(storedData)) {
          storedData.splice(index, 1); // delete the row from the local storage
          localStorage.setItem('students', JSON.stringify(storedData)); // set updated data in the local storage
          this.loadData(); // reload the table
        }
      }
    });
    //it handles the delete only to the row and not the whole local storage
  }

  editRow(index: number) {
    this.router.navigate(['/forms', index]); //routs to forms page with the id so it can target which student to edit
  }

  delToken() {
    const dialogRef = this.dialog.open(DeldialogComponent, {
      data: {
        firstname: 'Session',
        lastname: 'TOKEN',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        localStorage.removeItem('sessionToken');
        this.router.navigate(['/settings']);
      }
    });
  }

}
