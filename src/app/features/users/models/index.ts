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