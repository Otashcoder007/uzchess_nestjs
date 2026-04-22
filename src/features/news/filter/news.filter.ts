import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationFilters } from '../../common/filters/pagination.filters';

export class NewsFilter extends PaginationFilters {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  search?: string;
}
