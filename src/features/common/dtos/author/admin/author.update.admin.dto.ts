import { IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthorUpdateAdminDto {
  @IsString()
  @MaxLength(64)
  @Expose()
  @ApiProperty()
  fullName!: string;
}
