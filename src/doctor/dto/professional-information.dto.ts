import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ProfessionalInformationInterface } from '../interfaces/professional-information.interface';

export class ProfessionalInformationDto
  implements ProfessionalInformationInterface
{
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  experience: string;

  @IsString()
  @IsNotEmpty()
  professional_status: string;

  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsArray()
  languages: [string];

  @IsString()
  @IsNotEmpty()
  specialization: string;
}
