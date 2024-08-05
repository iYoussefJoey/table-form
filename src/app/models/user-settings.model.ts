import {NameFormatTypes} from "../enums/name-format-type.enum";

export class UserSettings implements IUserSettings {
  nameFormat!: NameFormatTypes;
  tokenExpiryDate!: Date;
  username!: string;
}


export interface IUserSettings {
  username: string;
  tokenExpiryDate: Date;
  nameFormat: NameFormatTypes
}
