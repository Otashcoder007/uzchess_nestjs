import { IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationFilters {
  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  page?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  size?: number;
}
