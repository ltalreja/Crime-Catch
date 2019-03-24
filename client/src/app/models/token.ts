export interface TokenResponse {
  token: string;
}

export enum role {
  User = 'User',
  Police = 'Police',
  NewsReporter = 'NewReporter'
}

export enum accountStatus {
  New = 'New',
  Verified = 'Verified'
}

export interface Address {
  street?: String;
  addressLine2?: String;
  city?: String;
  zip?: Number;
  state?: String;
  country?: String;
}

export interface TokenPayload {
  email: String;
  name?: {
    firstName?: String;
    lastName?: String;
  };
  ssn?: Number;
  phoneNo?: Number;
  role?: role;
  accountStatus?: accountStatus;
  address?: Address;
  password: String;
  emergencyContact?: {
    name?: String;
    email?: String;
  };
}
