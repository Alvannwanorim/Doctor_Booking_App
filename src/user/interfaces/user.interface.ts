import { ROLES } from '../types/user.types';
import { VERIFICATION } from '../types/verification.types';

export interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  dateOfBirth: string;
  gender: string;
  country: string;
  state: string;
  address: string;
  roles: ROLES;
  verificationStatus: VERIFICATION;
}
