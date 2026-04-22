import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DifficultyListPublicDto {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty({ type: 'string', format: 'binary' })
  icon!: string;
}
