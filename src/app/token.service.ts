import {Injectable} from '@angular/core';
import {NameFormatTypes} from "./enums/name-format-type.enum";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'sessionToken';
  // private nameFormat: string= 'first name';
  private nameFormat: NameFormatTypes = NameFormatTypes.FIRSTNAME_LASTNAME;

  constructor() {
  }

  generateToken() {
    const token = Math.random().toString(36).substring(2);// generate a random token between 0-1 (math.random())
    //converts this number to 36 so it can include more lettrts than numbers // removes the .0 at the end
    localStorage.setItem(this.tokenKey, token); //save this token to the browser local storage
    this.getToken();
    return token;
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  // set the name style
  setNameStyle(style: NameFormatTypes) {
    this.nameFormat = style;
  }

  // get the name style
  getNameStyle() {
    return this.nameFormat; // return the radio option
  }

}
