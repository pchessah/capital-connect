import { USER_ROLES } from "../../../shared/interfaces/user.interface";

export interface CreateUserInput {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: USER_ROLES[];
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