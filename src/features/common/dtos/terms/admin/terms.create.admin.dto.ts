import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TermsCreateAdminDto {
  @IsString()
  @Expose()
  @ApiProperty()
  content!: string;
}
