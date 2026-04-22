import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModelListDto } from '../../../../../core/base-model-list.dto';

export class CourseCategoryListAdminDto extends BaseModelListDto {
  @Expose()
  @ApiProperty()
  title!: string;
}
