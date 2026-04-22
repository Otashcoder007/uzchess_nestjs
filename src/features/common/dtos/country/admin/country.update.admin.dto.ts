import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CountryUpdateAdminDto {
  @IsString()
  @MaxLength(64)
  @IsOptional()
  @Expose()
  @ApiProperty()
  title?: string;

  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty({ type: 'string', format: 'binary' })
  flag?: string;
}
