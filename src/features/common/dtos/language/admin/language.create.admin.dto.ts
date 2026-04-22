import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class LanguageCreateAdminDto {
  @IsString()
  @MaxLength(32)
  @Expose()
  @ApiProperty()
  title!: string;

  @IsString()
  @MaxLength(2)
  @Expose()
  @ApiProperty()
  code!: string;
}
