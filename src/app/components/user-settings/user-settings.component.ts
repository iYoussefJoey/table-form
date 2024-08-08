import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {TokenService} from '../../token.service';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {NameFormatTypes} from "../../enums/name-format-type.enum";
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatRadioModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent implements OnInit {
  tokenTime!: Date;
  intervalId: any;
  tokenExpiryDate!: Date 
  radioOption: NameFormatTypes = NameFormatTypes.FIRSTNAME_LASTNAME;
  name: string = 'User';
todayDate: Date = new Date()

  constructor(private tokenserv: TokenService, private router: Router) {
  }
ngOnInit(): void {
  this.name = this.tokenserv.getUsername() || 'User'; //load username from service
    this.tokenExpiryDate = this.tokenserv.getTokenExpiryDate() || new Date(); // load token expiry from service
    this.radioOption = this.tokenserv.getNameStyle();
}
  onRadioClk() {
    this.tokenserv.setNameStyle(this.radioOption)// calls the service and passes the current value of radioOption this stores the selected name style
  }

  generateTokenAndNavigate() {
    this.tokenserv.setUsername(this.name);
    this.tokenserv.generateToken();
    this.tokenExpiryDate = this.tokenserv.getTokenExpiryDate()!;
    console.log(this.tokenserv.getToken(), this.name);
    this.router.navigate(['/table']);
    console.log('Session token generated');
  }
  // setAutoTokenClear() {
  //   const tokenExpiryDate = this.tokenserv.getTokenExpiryDate();
  //   if (tokenExpiryDate) {
  //     const timeUntilExpiry = tokenExpiryDate.getTime() - Date.now();
  //     if (timeUntilExpiry > 0) {
  //       clearTimeout(this.intervalId); // Clear any previous timeout to prevent multiple timers
  //       this.intervalId = setTimeout(() => {
  //         this.tokenserv.clearToken();
  //         this.tokenExpiryDate = null; // Set it to null to indicate no valid expiry date exists
  //         console.log('Session token removed due to expiry');
  //       }, timeUntilExpiry);
  //     } else {
  //       this.tokenserv.clearToken();
  //       this.tokenExpiryDate = null;// Handle immediate expiry by setting it to null
  //     }
  //   }
  // }
}