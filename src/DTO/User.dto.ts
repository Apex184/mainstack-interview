export interface UserPayload {
  _id: string;
  email: string;
  isVerified: boolean;
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLOCKED = "blocked",
  DELETED = "deleted",
  SOLD = "sold",
}

export interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  image?: string;
  status?: UserStatus;
  salt: string;
  otp: string;
  otp_expiry: Date;
  isVerified?: boolean;
}

export interface UserSignupInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  image?: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}
