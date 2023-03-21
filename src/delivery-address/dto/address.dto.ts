import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { DeliveryAddressesInterface } from '../interfaces/addresses.interface';

export class AddressDto implements DeliveryAddressesInterface {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  address: string;
}
