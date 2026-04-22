import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class DifficultyCreateAdminDto {
  @IsString()
  @MaxLength(32)
  @Expose()
  @ApiProperty()
  title!: string;

  @IsString()
  @Expose()
  @ApiProperty({ type: 'string', format: 'binary' })
  icon!: string;
}
