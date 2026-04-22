import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModelListDto } from '../../../../../core/base-model-list.dto';

export class TermsListAdminDto extends BaseModelListDto {
  @Expose()
  @ApiProperty()
  content!: string;
}
