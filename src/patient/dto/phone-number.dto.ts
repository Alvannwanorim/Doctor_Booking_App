import { IsPhoneNumber } from 'class-validator';

export class PhoneNumberDto {
  @IsPhoneNumber('NG')
  phone_number: string;
}
