import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { TokenService } from '../../token.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';




@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatIconModule,MatButtonModule,MatRadioModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent {
name:string = 'User'
tokenTime!: Date;  
intervalId: any;
radioOption:string ='firstname'

constructor(private tokenserv:TokenService, private router:Router){}
onRadioClk(){
  this.tokenserv.setNameStyle(this.radioOption)
}

generateTokenAndNavigate() {
  this.tokenserv.generateToken();
  console.log(this.tokenserv.getToken(),this.name)
  this.router.navigate(['/table']);
  let countdown = 1000; // countdown in seconds
  this.tokenTime = new Date();

  // Start the interval to log the countdown every second
  this.intervalId = setInterval(() => {
    if (countdown > 0) {
      if(localStorage.getItem('sessionToken') === null){
        console.log('Session token not found' , countdown--);
      }
      console.log(`Time remaining before token removal: ${countdown} seconds`);
      countdown--;
    } else {
      clearInterval(this.intervalId);
      localStorage.removeItem('sessionToken');
      console.log('Session token removed');
    }
  }, 1000);
}
}
