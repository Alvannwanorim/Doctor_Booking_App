import { IsPhoneNumber } from 'class-validator';

export class PhoneNumberDto {
  @IsPhoneNumber('NG')
  phoneNumber: string;
}
