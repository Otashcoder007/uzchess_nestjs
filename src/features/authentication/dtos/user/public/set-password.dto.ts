import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetPasswordDto {
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  login!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(6)
  @ApiProperty()
  code!: string;

  @IsString()
  @MaxLength(32)
  @ApiProperty()
  password!: string;
}
