import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BaseModelListDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty({ example: '2026-01-01T13:59:00.000Z' })
  created!: string;

  @Expose()
  @ApiProperty({ example: '2026-01-01T13:59:00.000Z' })
  updated?: string;
}
