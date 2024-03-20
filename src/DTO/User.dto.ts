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
  phoneNumber: string;
  image?: string;
  status?: UserStatus;
  isVerified?: boolean;
}
