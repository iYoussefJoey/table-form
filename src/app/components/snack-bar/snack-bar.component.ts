import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';
import { TokenService } from '../../token.service';

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.css'
})
export class SnackBarComponent implements OnInit {
  constructor(private tokensrvs: TokenService){}
  tokenExpiryDate = new Date();
  snackBarRef = inject(MatSnackBarRef);

  ngOnInit(): void {
    this.tokenExpiryDate = this.tokensrvs.getTokenExpiryDate() || new Date();
  }
}
