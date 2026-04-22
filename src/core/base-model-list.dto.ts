import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BaseModelListDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  created!: string;

  @Expose()
  @ApiProperty()
  updated?: string;
}
