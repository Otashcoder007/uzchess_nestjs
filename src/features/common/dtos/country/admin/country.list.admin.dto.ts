import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModelListDto } from '../../../../../core/base-model-list.dto';

export class CountryListAdminDto extends BaseModelListDto {
  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty({ type: 'string', format: 'binary' })
  flag!: string;
}
