import { IsString, MaxLength, MinLength } from 'class-validator';

export class BankDetailsDto {
  @IsString()
  bank_name: string;

  @IsString()
  account_name: string;

  @IsString()
  @MinLength(11)
  @MaxLength(11)
  account_number: string;

  @IsString()
  bank_code: string;
}

export class BankDetailsPreview {
  @IsString()
  account_name: string;

  @IsString()
  account_number: string;
}
