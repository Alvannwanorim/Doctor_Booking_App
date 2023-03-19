import { ROLES } from '../types/patient.types';
import { VERIFICATION } from '../types/verification.types';

export interface PatientInterface {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  date_of_birth: string;
  gender: string;
  country: string;
  state: string;
  address: string;
  roles: ROLES;
  verification_status: VERIFICATION;
}
