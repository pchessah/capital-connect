export interface CreateUserInput {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: string;
  agreedToTAC: string;
}

export enum PASSWORD_STRENGTH {
  STRONG = 'Strong',
  WEAK = 'Weak',
  MEDIUM = 'Medium'
}

export enum FORM_TYPE {
  SIGNUP,
  SIGNIN
}

export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: string;
  resetPasswordToken: string | null;
  resetPasswordExpires: string | null;
  isEmailVerified: boolean;
  emailVerificationToken: string;
  emailVerificationExpires: string;
}

export interface Profile{
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  roles: string;
}
