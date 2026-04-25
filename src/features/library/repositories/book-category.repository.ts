import { BaseRepository } from '../../../core/repositories/base-repository';
import { BookCategory } from '../entities/book-category.entity';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

export class BookCategoryRepository extends BaseRepository<BookCategory> {
  constructor(
    protected config: ConfigService,
    @InjectRepository(BookCategory)
    protected repo: Repository<BookCategory>,
  ) {
    super();
  }

  async existsByTitle(title: string) {
    return await this.repo.countBy({ title: ILike(title) });
  }
}
