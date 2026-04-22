import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TermsListPublicDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  content!: string;
}
