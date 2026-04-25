import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { LoginType } from '../../../../../core/enums/login-type.enum';
import { Role } from '../../../../../core/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserCreateAdminDto {
  @Expose()
  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role!: Role;

  @Expose()
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  fullName!: string;

  @Expose()
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  profileImage?: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  login!: string;

  @Expose()
  @ApiProperty({ enum: LoginType })
  @IsEnum(LoginType)
  loginType!: LoginType;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(32)
  password?: string;

  @Expose()
  @ApiProperty()
  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  isVerified!: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  isActive!: boolean;
}
