import { IsOptional, IsString } from 'class-validator';
import { DocumentsInterface } from '../interfaces/documents.interface';

export class DocumentsDto implements DocumentsInterface {
  @IsString()
  @IsOptional()
  professional_photograph: string;

  @IsString()
  @IsOptional()
  id_card: string;

  @IsString()
  @IsOptional()
  degree_certificate: string;

  @IsString()
  @IsOptional()
  practice_license: string;

  @IsString()
  @IsOptional()
  nysc_certificate: string;

  @IsString()
  @IsOptional()
  signature: string;
}
