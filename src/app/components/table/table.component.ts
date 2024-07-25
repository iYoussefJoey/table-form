import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {CdkDragDrop, CdkDragMove, CdkDragStart, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { DeldialogComponent } from '../deldialog/deldialog.component';
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
export class TableComponent implements AfterViewInit , OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table! : MatTable<any>; //@Viewchild used to get refereces to all 3 above references
  displayedColumns: string[] = ['firstname', 'lastname', 'dOB', 'gender', 'gradutionYear', 'phone', 'email', 'familymember','lastModificationDate','studentParent','actions'];
  dataSource = new MatTableDataSource<any>([]);// datasource used to show the data in the table
  readonly dialog = inject(MatDialog);

 constructor(private router:Router, public _dialog:MatDialog) { }
  ngOnInit(): void {
    this.loadData()

  }
  loadData(){
    let oldData: any = JSON.parse(localStorage.getItem('registerForm') || '[]');
    
    if (Array.isArray(oldData)) {
      this.dataSource.data = oldData
    }
    else{
      this.dataSource.data =[]
    }
    console.log(this.dataSource.data);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // lifecycle hook.... used ngAfterViewInIt Initializes pagination and sorting after the view has been fully initialized.

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /*
   * used applyFilter to filter the whole table to get any value in any Column
   *it uses MatTableDataSource filter property and used to trim to remove white spaces and to lower case to change all input to lower case to match
   */
 

  updateDisplayedColumns(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
    this.displayedColumns = [...this.displayedColumns]; // Create a new reference
    this.table.renderRows();
    // it handles the column drag and drop to rearrange the column if needed 
    //used moveItemInArray to update the displayedcolums array and force it to render with new col order
  }
  deleteRow(index: number) {
    const student = this.dataSource.data[index];
    const dialogRef = this._dialog.open(DeldialogComponent,{
      data: {
        firstname: student.firstname,
        lastname: student.lastname
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result==true) {
        const storedData = JSON.parse(localStorage.getItem('registerForm') || '[]');
        if (Array.isArray(storedData)) {
          storedData.splice(index, 1);
          localStorage.setItem('registerForm', JSON.stringify(storedData));
          this.loadData();
        }
      }
    })
  //it handles the delete only to the row and not the whole local storage
  }
    editRow(index:number) {
    this.router.navigate(['/forms',index]) //routs to forms page with the id so it can target which student to edit
    }
    delToken(){
      localStorage.removeItem('sessionToken');
      this.router.navigate(['/settings']);
      location.reload(); // when it navigate relod so it can stop the countdown in the console
    }
}