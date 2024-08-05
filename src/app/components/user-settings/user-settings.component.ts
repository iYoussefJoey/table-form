import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {TokenService} from '../../token.service';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {NameFormatTypes} from "../../enums/name-format-type.enum";


@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatRadioModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent {
  name: string = 'User'
  tokenTime!: Date;
  intervalId: any;
  radioOption: NameFormatTypes = NameFormatTypes.FIRSTNAME_LASTNAME;

  constructor(private tokenserv: TokenService, private router: Router) {
  }

  onRadioClk() {
    this.tokenserv.setNameStyle(this.radioOption)// calls the service and passes the current value of radioOption this stores the selected name style
  }

  generateTokenAndNavigate() {
    this.tokenserv.generateToken();
    console.log(this.tokenserv.getToken(), this.name)
    this.router.navigate(['/table']);
    console.log('session token generated');
  
}
}