import { IsString } from 'class-validator';

export class VerifyBankDetailsDto {
  @IsString()
  account_number: string;

  @IsString()
  bank_code: string;
}
