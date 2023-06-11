import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DepositDto {
  @IsNumber()
  amount: number;
}
export class WalletTopUpDto {
  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  transaction_id: string;

  @IsString()
  @IsNotEmpty()
  wallet_id: string;
}
