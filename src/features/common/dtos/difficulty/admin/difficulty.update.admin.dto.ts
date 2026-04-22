import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class DifficultyUpdateAdminDto {
  @IsString()
  @MaxLength(32)
  @IsOptional()
  @Expose()
  @ApiProperty()
  title?: string;

  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty({ type: 'string', format: 'binary' })
  icon?: string;
}
