import { ProfessionalInformationInterface } from './professional-information.interface';

export interface DoctorInterface {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  country: string;
  state: string;
  address: string;
  professional_experience: ProfessionalInformationInterface;
}
