import { BaseRepository } from '../../../core/repositories/base-repository';
import { News } from '../entities/news.entity';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { NewsFilter } from '../filter/news.filter';

export class NewsAdminRepository extends BaseRepository<News> {
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(News)
    protected readonly repo: Repository<News>,
  ) {
    super();
  }

  async getAll(filters: NewsFilter) {
    const where: FindOptionsWhere<News> = {};
    if (filters.search) {
      where.title = ILike(`%${filters.search}%`);
    }
    return await super.getAll(filters, where);
  }
}
