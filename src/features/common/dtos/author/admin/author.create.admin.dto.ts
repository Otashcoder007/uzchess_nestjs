import { IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthorCreateAdminDto {
  @IsString()
  @MaxLength(64)
  @Expose()
  @ApiProperty()
  fullName!: string;
}
