import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewsUpdateAdminDto {
  @IsString()
  @MaxLength(256)
  @IsOptional()
  @ApiProperty()
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  content?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  date?: string;
}
