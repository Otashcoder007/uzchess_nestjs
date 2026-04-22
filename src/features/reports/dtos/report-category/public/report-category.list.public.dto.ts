import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReportCategoryListPublicDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  order?: number;
}
