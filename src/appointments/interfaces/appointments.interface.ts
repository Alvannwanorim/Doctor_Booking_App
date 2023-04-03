import { APPOINTMENTS_STATUS } from '../types/appointments-status.type';
import { PurposeOfVisitInterface } from './purpose-of-visit.interface';

export interface AppointmentsInterface {
  date: string;
  status: APPOINTMENTS_STATUS;
  purpose_of_visit: PurposeOfVisitInterface;
  from: string;
  to: string;
}
