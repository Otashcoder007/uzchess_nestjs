import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class ReportCategoryCreateAdminDto {
  @IsString()
  @MaxLength(64)
  @Expose()
  @ApiProperty()
  title!: string;

  @IsNumber()
  @IsOptional()
  @Expose()
  @ApiProperty()
  order?: number;
}
