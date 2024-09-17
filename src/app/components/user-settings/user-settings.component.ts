import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TokenService } from '../../token.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { NameFormatTypes } from '../../enums/name-format-type.enum';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { TranslationService } from '../../services/translation.service';
import { GlobalButtonComponent } from '../global-button/global-button.component';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { GobalSelectListComponent } from '../gobal-select-list/gobal-select-list.component';
import { MatSelectModule } from '@angular/material/select';
import { LanguageOption } from '../../interfaces/language-option';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    CommonModule,
    DateFormatPipe,
    GlobalButtonComponent,
    TranslatePipe,
    GobalSelectListComponent,
    MatSelectModule,
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css',
})
export class UserSettingsComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  tokenTime!: Date;
  intervalId: any;
  tokenExpiryDate: Date | null = null; // Declare it as Date | null
  radioOption: NameFormatTypes = NameFormatTypes.FIRSTNAME_LASTNAME;
  name: string = 'User';
  todayDate: Date = new Date();
  tokenColor!: string;
  translationService = inject(TranslationService);
  translations: Record<string, string> = {};
  childWidth: string = '100px';
  loadingStas: { [key: string]: boolean } = {};
  languageOptions: LanguageOption[] = [
    {
      language: 'English',
      flag: 'assets/ukround.png',
      translate: () => this.switchToEnglish('button2'),
    },
    {
      language: 'Polski',
      flag: 'assets/PLFLAG.png',
      translate: () => this.switchToPolish('button1'),
    },
  ];
  // selectedLanguage: LanguageOption =   this.languageOptions.find(lang=>lang.language==='English') || this.languageOptions[0];
  selectedLanguage: LanguageOption = this.languageOptions[0];

  constructor(
    private tokenserv: TokenService,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.name = this.tokenserv.getUsername() || 'User'; //load username from service
    this.tokenExpiryDate = this.tokenserv.getTokenExpiryDate() || new Date(); // load token expiry from service
    this.radioOption = this.tokenserv.getNameStyle();
    this.setAutoTokenClear();
    this.ref.detectChanges();
  }

  onRadioClk() {
    this.tokenserv.setNameStyle(this.radioOption); // calls the service and passes the current value of radioOption this stores the selected name style
  }

  showToken() {
    if (localStorage.getItem('sessionToken')) {
      this.tokenColor = 'green';
      return this.translationService.get('tokenfound');
    } else !localStorage.getItem('sessionToken');
    {
      this.tokenColor = 'red';
      return this.translationService.get('tokenNotFound');
    }
  }


  /**
   * Generates a new token and navigates to the table page.
   * @param buttonId The id of the button that triggered the action.
   */
  // generateTokenAndNavigate(buttonId: string): void {
    // Set the loading status of the button to true
  generateTokenAndNavigate(buttonId: string) :void {
    this.loadingStas[buttonId] = true;
    // Set the username
    this.tokenserv.setUsername(this.name);
    // Generate a new token
    this.tokenserv.generateToken();
    // Get the new token expiry date
    this.tokenExpiryDate = this.tokenserv.getTokenExpiryDate()!;
    // Log the new token and username to the console
    console.log(this.tokenserv.getToken(), this.name);
    // Open a snackbar with a message
    this._snackBar.openFromComponent(SnackBarComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
    // Navigate to the table page
    this.router.navigate(['/table']);
    // Set the loading status of the button to false
    this.loadingStas[buttonId] = false;
    // Log a message to the console
    console.log('Session token generated');
  }
  setAutoTokenClear() {
    const tokenExpiryDate = this.tokenserv.getTokenExpiryDate();
    if (tokenExpiryDate) {
      const timeUntilExpiry = tokenExpiryDate.getTime() - Date.now();
      if (timeUntilExpiry > 0) {
        clearTimeout(this.intervalId); // Clear any previous timeout to prevent multiple timers
        this.intervalId = setTimeout(() => {
          this.tokenserv.clearToken();
          this.tokenExpiryDate = null; // Set it to null to indicate no valid expiry date exists
          console.log('Session token removed due to expiry');
        }, timeUntilExpiry);
      } else {
        this.tokenserv.clearToken();
        this.tokenExpiryDate = null; // Handle immediate expiry by setting it to null
      }
    }
  }

  public switchToPolish(buttonId: string): void {
    this.loadingStas[buttonId] = true;
    setTimeout(() => {
      this.loadingStas[buttonId] = false;
      this.selectedLanguage = this.languageOptions.find(option=>option.language==='Polski') || this.languageOptions[1];

    }, 1000);
    this.translationService.setLanguage('pl');
  }

  public switchToEnglish(buttonId: string): void {
    this.loadingStas[buttonId] = true;
    setTimeout(() => {
      this.loadingStas[buttonId] = false;
      this.selectedLanguage = this.languageOptions.find(option=>option.language==='English') || this.languageOptions[0];
    }, 1000);
    this.translationService.setLanguage('en');
  }
  onLanguageChange() {
    this.selectedLanguage.translate();
  }
}
