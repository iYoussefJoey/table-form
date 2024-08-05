import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-deldialog',
  standalone: true,
  imports: [MatButtonModule,MatIconModule],
  templateUrl: './deldialog.component.html',
  styleUrl: './deldialog.component.css'
})
export class DeldialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public dialogRef: MatDialogRef<DeldialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
    // camel case: addUserComponent
    // pascal case: AddUserComponent
    // snake case: add-user-component
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }


}
