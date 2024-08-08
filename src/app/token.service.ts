import {Injectable} from '@angular/core';
import {NameFormatTypes} from "./enums/name-format-type.enum";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  // private nameFormat: string= 'first name';
  private nameFormat: NameFormatTypes = NameFormatTypes.FIRSTNAME_LASTNAME; // Declare nameFormat property
  private tokenKey = 'sessionToken';
  private nameFormatKey!: 'nameFormat'
  private usernameKey = 'username';
  private tokenExpiryDateKey = 'tokenExpiryDate';
  private tokenValidityPeriod = 15 * 60 * 1000; // 15 minutes
  constructor() {
    const storedNameFormat  = localStorage.getItem(this.nameFormatKey);
    if(storedNameFormat ){
      this.nameFormat= JSON.parse(storedNameFormat) as NameFormatTypes ;
      setTimeout(() => {
        this.clearToken();
        console.log('Session token removed');
      }, 900000);
    }
  }

  generateToken() {
    const token = Math.random().toString(36).substring(2);// generate a random token between 0-1 (math.random())
    //converts this number to 36 so it can include more lettrts than numbers // removes the .0 at the end
    const tokenExpiryDate = new Date(Date.now() + this.tokenValidityPeriod);
    localStorage.setItem(this.tokenKey, token); //save this token to the browser local storage
    localStorage.setItem(this.tokenExpiryDateKey, tokenExpiryDate.toLocaleString());
    return token;
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
  getTokenExpiryDate() {
    const expiry = localStorage.getItem(this.tokenExpiryDateKey);
    return expiry ? new Date(expiry) : null;
  }


  // set the name style
  setNameStyle(style: NameFormatTypes) {
    this.nameFormat = style;
    localStorage.setItem(this.nameFormatKey, JSON.stringify(style));

  }

  // get the name style
  getNameStyle() {
    return this.nameFormat; // return the radio option
  }
  setUsername(username: string) {
    localStorage.setItem(this.usernameKey, username);
  }

  getUsername() {
    return localStorage.getItem(this.usernameKey);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.tokenExpiryDateKey);
  }
}
