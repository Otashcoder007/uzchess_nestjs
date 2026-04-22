import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CountryListPublicDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty({ type: 'string', format: 'binary' })
  flag!: string;
}
