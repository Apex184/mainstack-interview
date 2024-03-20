export interface UserPayload {
  id: string;
  email: string;
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLOCKED = "blocked",
  DELETED = "deleted",
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
  isVerified?: boolean;
}

export interface UserLoginInput {
  email: string;
  password: string;
}
