import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { ReportType } from '../../../../../core/enums/report-type.enum';

export class ReportCreatePublicDto {
  @IsInt()
  @ApiProperty()
  categoryId!: number;

  @IsEnum(ReportType)
  @ApiProperty()
  target!: ReportType;

  @Expose()
  @ApiProperty()
  targetId!: number;

  @IsString()
  @IsOptional()
  @MaxLength(256)
  @ApiProperty({ required: false })
  desc!: number;
}
