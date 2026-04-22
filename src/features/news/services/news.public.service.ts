import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { News } from '../entities/news.entity';
import { FindOptionsWhere, ILike } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { NewsFilter } from '../filter/news.filter';
import { NewsListPublicDto } from '../dtos/news/public/news.list.public.dto';
import { PaginatedResult } from '../../common/dtos/paginated-result.dto';
import { NewsDetailPublicDto } from '../dtos/news/public/news.detail.public.dto';

@Injectable()
export class NewsPublicService {
  constructor(private readonly config: ConfigService) {}

  async getAll(filters: NewsFilter) {
    let whereOptions: FindOptionsWhere<News> = {};
    const take = filters.size ?? this.config.getOrThrow<number>('DEFAULT_SIZE');
    const currentPage = filters.page ?? this.config.getOrThrow<number>('DEFAULT_PAGE');
    const skip = (currentPage - 1) * take;

    if (filters.search) {
      whereOptions.title = ILike(`%${filters.search}%`);
    }

    const totalCount = await News.countBy(whereOptions);
    const totalPages = Math.ceil(totalCount / take);
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    let news = await News.find({ where: whereOptions, skip: skip, take: take });
    const data = plainToInstance(NewsListPublicDto, news, { excludeExtraneousValues: true });
    return { totalPages, currentPage, nextPage, totalCount, data } as PaginatedResult;
  }

  async getOne(id: number) {
    let news = await News.findOneBy({ id });
    if (!news) {
      throw new NotFoundException();
    }
    if (news.image) {
      news.image = this.config.getOrThrow<string>('BASE_URL') + '/' + news.image;
    }
    let data = plainToInstance(NewsDetailPublicDto, news, { excludeExtraneousValues: true });
    return data;
  }
}
