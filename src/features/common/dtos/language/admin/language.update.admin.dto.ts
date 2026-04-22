import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class LanguageUpdateAdminDto {
  @IsString()
  @MaxLength(32)
  @IsOptional()
  @Expose()
  @ApiProperty()
  title?: string;

  @IsString()
  @MaxLength(2)
  @IsOptional()
  @Expose()
  @ApiProperty()
  code?: string;
}
