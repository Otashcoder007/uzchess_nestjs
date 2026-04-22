import { IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModelListDto } from '../../../../../core/base-model-list.dto';

export class AuthorListAdminDto extends BaseModelListDto {
  @IsString()
  @MaxLength(64)
  @Expose()
  @ApiProperty()
  fullName!: string;
}
