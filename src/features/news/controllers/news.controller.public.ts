import { Controller, Get, Param, ParseIntPipe, Query, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginatedResultDto } from '../../common/dtos/paginated-result.dto';
import { NewsDetailPublicDto } from '../dtos/news/public/news.detail.public.dto';
import { NewsListPublicDto } from '../dtos/news/public/news.list.public.dto';
import { NewsFilter } from '../filter/news.filter';
import { NewsPublicService } from '../services/news.public.service';

@ApiTags('News - Public')
@Controller('public/news')
export class NewsControllerPublic {
  constructor(private readonly service: NewsPublicService) {}

  @Get()
  @ApiOkResponse({ type: PaginatedResultDto(NewsListPublicDto) })
  async getAll(@Req() req: Request, @Res() res: Response, @Query() filters: NewsFilter) {
    const result = await this.service.getAll(filters);
    // @ts-ignore
    result.data.forEach((item) => (item.image = getFullPath(req, item.image)));

    return res.json(result);
  }

  @Get(':id')
  @ApiOkResponse({ type: NewsDetailPublicDto })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getOne(id);
  }
}
