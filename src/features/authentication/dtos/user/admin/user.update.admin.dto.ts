import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { LoginType } from '../../../../../core/enums/login-type.enum';
import { Role } from '../../../../../core/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserUpdateAdminDto {
  @Expose()
  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @Expose()
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  @IsOptional()
  fullName?: string;

  @Expose()
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  profileImage?: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  @IsOptional()
  login?: string;

  @Expose()
  @ApiProperty({ enum: LoginType })
  @IsEnum(LoginType)
  @IsOptional()
  loginType?: LoginType;

  @Expose()
  @ApiProperty()
  @IsString()
  @MaxLength(32)
  @IsOptional()
  password?: string;

  @Expose()
  @ApiProperty()
  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
