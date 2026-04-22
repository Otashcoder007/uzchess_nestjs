import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CountryCreateAdminDto {
  @IsString()
  @MaxLength(64)
  @Expose()
  @ApiProperty()
  title!: string;

  @IsString()
  @Expose()
  @ApiProperty({ type: 'string', format: 'binary' })
  flag!: string;
}
