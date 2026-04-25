import { BaseModelListDto } from '../../../../../core/base-model-list.dto';
import { LoginType } from '../../../../../core/enums/login-type.enum';
import { Role } from '../../../../../core/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserListAdminDto extends BaseModelListDto {
  @Expose()
  @ApiProperty({ enum: Role })
  role!: Role;

  @Expose()
  @ApiProperty()
  fullName!: string;

  @Expose()
  @ApiProperty()
  birthDate?: string;

  @Expose()
  @ApiProperty()
  profileImage?: string;

  @Expose()
  @ApiProperty()
  login!: string;

  @Expose()
  @ApiProperty({ enum: LoginType })
  loginType!: LoginType;

  @Expose()
  @ApiProperty()
  isVerified!: boolean;

  @Expose()
  @ApiProperty()
  isActive!: boolean;
}
