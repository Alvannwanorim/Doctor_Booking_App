export interface ProfessionalInformationInterface {
  category: string;
  experience: string;
  professional_status: string;
}

export interface DoctorInterface {
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
  professional_experience: ProfessionalInformationInterface;
}
