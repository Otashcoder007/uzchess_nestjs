import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class ReportCategoryUpdateAdminDto {
  @IsString()
  @MaxLength(64)
  @IsOptional()
  @Expose()
  @ApiProperty()
  title?: string;

  @IsNumber()
  @IsOptional()
  @Expose()
  @ApiProperty()
  order?: number;
}
