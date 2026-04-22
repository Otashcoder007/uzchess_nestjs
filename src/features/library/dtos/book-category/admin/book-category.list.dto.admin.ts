import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BookCategoryListDtoAdmin {
  @ApiProperty()
  @Expose()
  id!: number;

  @ApiProperty()
  @Expose()
  title!: string;

  @ApiProperty()
  @Expose()
  created!: string;

  @ApiProperty()
  @Expose()
  updated?: string;
}
