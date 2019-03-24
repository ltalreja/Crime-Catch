import {accountStatus, Address, role} from './token';

export interface UserInfo {
  _id: String;
  email: String;
  name?: {
    firstName?: String,
    lastName?: String,
  };
  ssn?: Number;
  phoneNo?: Number;
  role?: role;
  accountStatus?: accountStatus;
  address?: Address;
  exp: number;
  iat: number;
  emergencyContact?: {
    name?: String;
    email?: String;
  };
}

export interface UserCrisis {
  _id?: String,
  user?: UserInfo,
  Lat?: String,
  Long?: String,
  Location?: String,
  offenceType?: String,
  offenceDescription?: String,
}
