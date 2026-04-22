import { IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CourseCategoryCreateAdminDto {
  @IsString()
  @MaxLength(64)
  @Expose()
  @ApiProperty()
  title!: string;
}
